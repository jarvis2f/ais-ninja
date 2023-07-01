import styles from './index.module.less';
import {EditableProTable, ProColumns, ProForm} from '@ant-design/pro-components';
import {Button, Form, Input, Menu, message, Popconfirm, Space, Spin, Tooltip} from 'antd';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
	DeleteOutlined,
	LeftCircleTwoTone,
	LeftOutlined,
	PlusOutlined,
	RightOutlined,
	ThunderboltOutlined
} from '@ant-design/icons';
import {pluginStore} from '../../store';
import {
	deletePlugin,
	deletePluginFunction,
	getPlugin,
	postPlugin,
	postPluginFunction,
	putPlugin,
	putPluginFunction
} from '@/request/api';
import CodeInput from '@/components/CodeInput';
import {FunctionInfo, PluginInfo, VariableInfo} from '@/types';
import {MenuItemType} from 'antd/es/menu/hooks/useItems';
import {generateUUID, joinTrim} from '@/utils';
import useDocumentResize from '@/hooks/useDocumentResize';

function PluginEdit() {
	const {t} = useTranslation();
	const documentResize = useDocumentResize();
	const [spinning, setSpinning] = useState<boolean>(false);
	const [plugin, setPlugin] = useState<PluginInfo>({} as never);
	const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
	const [menuCollapsed, setMenuCollapsed] = useState(false);
	const [selectedKeys, setSelectedKeys] = useState<string[]>(['plugin']);
	const [editPlugin, setEditPlugin] = useState<boolean>(true);
	const [updateBlock, currentPluginId, updateCurrentPluginId] = pluginStore(state => [state.updateBlock,
		state.currentPluginId, state.updateCurrentPluginId]);
	const [newFunctionNo, setNewFunctionNo] = useState<number>(0);
	const [pluginForm] = Form.useForm<PluginInfo>();
	const [pluginFunctionForm] = Form.useForm<FunctionInfo>();
	const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
		plugin.variables?.map(item => item.id) || []);

	useEffect(() => {
		setMenuCollapsed(documentResize.width < 768);
	}, [documentResize.width]);

	// 获取数据
	useEffect(() => {
		if (currentPluginId) {
			getPlugin(currentPluginId).then(res => {
				setPlugin(res.data);
				setSpinning(false);
			});
		} else {
			setPlugin({
				name: 'New Plugin',
				functions: [],
			} as never);
			setSpinning(false);
		}
	}, [currentPluginId]);

	// 更新菜单
	useEffect(() => {
		const menuItems = [
			{
				key: 'top-button',
				disabled: true,
				label: (
					<div className="remove_padding" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
						<Space>
							<Button
								onClick={() => {
									updateCurrentPluginId(undefined);
									updateBlock('main');
								}}
								icon={<LeftCircleTwoTone/>}
							>
								{t('返回')}
							</Button>
							<Popconfirm
								title={t('删除此插件')}
								description={t('确定删除此插件吗？')}
								onConfirm={handleDeletePlugin}
								okText="Yes"
								cancelText="No"
							>
								<Button
									danger
									icon={<DeleteOutlined/>}
								>
									{t('删除')}
								</Button>
							</Popconfirm>
						</Space>
					</div>
				)
			},
			{
				type: 'group',
				label: 'plugin',
				children: [
					{
						key: 'plugin',
						label: plugin.name
					},
				]
			} as never,
		]
		menuItems.push({
			type: 'group',
			label: 'functions',
			children: plugin.functions?.map((item: FunctionInfo) => {
				return {
					key: 'function:' + item.id,
					label: item.name,
					icon: item.modified ? <ThunderboltOutlined/> : '',
				}
			})
		} as never)
		menuItems.push({
			key: 'bottom-button',
			disabled: true,
			label: (
				<div className="remove_padding" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
					<Tooltip title={t('先保存插件内容再新增方法')} className={styles.plugin_edit_menu_add_tooltip}>
						<Button
							type="primary"
							style={{padding: '4px 0', width: '80%'}}
							icon={<PlusOutlined/>}
							disabled={plugin.id === undefined}
							onClick={() => addFunction()}
						/>
					</Tooltip>
				</div>
			)
		} as never)
		setMenuItems(menuItems);
	}, [plugin, documentResize.width]);

	// 更新 plugin 表单
	useEffect(() => {
		pluginForm.setFieldsValue(plugin);
	}, [plugin, pluginForm]);

	// 更新 function 表单
	useEffect(() => {
		const functionData = getCurrentFunction();
		if (functionData) {
			pluginFunctionForm.setFieldsValue(functionData as FunctionInfo);
		}
	}, [plugin.functions, pluginFunctionForm, selectedKeys]);

	const getCurrentFunction = () => {
		let functionId: number | string = selectedKeys[0].split(':')[1];
		if (!functionId)
			return;
		functionId = functionId.indexOf('-') === -1 ? Number(functionId) : functionId;
		return plugin.functions?.find((item: FunctionInfo) => item.id === functionId);
	}

	const updateFunction = (functionData: FunctionInfo) => {
		plugin.functions = plugin.functions?.map((item: FunctionInfo) => {
			if (item.id === functionData.id) {
				return functionData;
			} else {
				return item;
			}
		});
		setPlugin({...plugin});
	}

	const handlePluginFormFinish = (values: PluginInfo): Promise<boolean | void> => {
		console.log(values);
		if (currentPluginId) {
			return putPlugin(currentPluginId, values).then(res => {
				if (res.code === 0) {
					message.success(t('保存成功'));
					updateCurrentPluginId(res.data.id);
				}
			});
		} else {
			return postPlugin(values).then(res => {
				if (res.code === 0) {
					message.success(t('保存成功'));
					updateCurrentPluginId(res.data.id);
				}
			});
		}
	}

	const handleDeletePlugin = async () => {
		if (currentPluginId) {
			await deletePlugin(currentPluginId).then(res => {
				if (res.code === 0) {
					message.success(t('删除成功'));
					updateCurrentPluginId(undefined);
				}
			});
		}
		updateBlock('main');
	}

	const handlePluginFunctionFormFinish = async (values: FunctionInfo): Promise<boolean | void> => {
		console.log(values);
		if (!currentPluginId) {
			await message.error(t('请先保存插件信息'));
			return Promise.resolve(false);
		}
		const currentFunction = getCurrentFunction();
		if (!currentFunction)
			return;
		if (!currentFunction.new) {
			return putPluginFunction(currentPluginId, currentFunction.id as string, currentFunction).then(res => {
				if (res.code === 0) {
					message.success(t('保存成功'));
					updateFunction(res.data);
				}
			});
		} else {
			delete currentFunction.id;
			return postPluginFunction(currentPluginId, currentFunction).then(res => {
				if (res.code === 0) {
					message.success(t('保存成功'));
					updateFunction(res.data);
				}
			});
		}
	}

	const handleDeleteFunction = async () => {
		const currentFunction = getCurrentFunction();
		if (!currentFunction)
			return;
		if (currentPluginId && !currentFunction.new) {
			deletePluginFunction(currentPluginId, currentFunction.id as string).then(res => {
				if (res.code === 0) {
					message.success(t('删除成功'));
				}
			});
		}
		plugin.functions = plugin.functions?.filter((item: FunctionInfo) => item.id !== currentFunction.id);
		setPlugin({...plugin});
		setSelectedKeys(['plugin']);
		setEditPlugin(true);
	}

	const handlePluginFormValuesChange = (changedValues: Partial<PluginInfo>) => {
		if ('name' in changedValues) {
			setPlugin(prevPlugin => ({
				...prevPlugin,
				name: changedValues.name || '',
			}));
		}
		if ('description' in changedValues) {
			setPlugin(prevPlugin => ({
				...prevPlugin,
				description: changedValues.description || '',
			}));
		}
		if ('avatar' in changedValues) {
			setPlugin(prevPlugin => ({
				...prevPlugin,
				avatar: changedValues.avatar || '',
			}));
		}
		if ('variables' in changedValues) {
			setPlugin(prevPlugin => ({
				...prevPlugin,
				variables: changedValues.variables || [],
			}));
		}
	};

	const handlePluginFunctionFormValuesChange = (changedValues: Partial<FunctionInfo>) => {
		const currentFunction = getCurrentFunction();
		if (currentFunction) {
			currentFunction.modified = true;
			if ('name' in changedValues) {
				currentFunction.name = changedValues.name || '';
			}
			if ('description' in changedValues) {
				currentFunction.description = changedValues.description || '';
			}
			if ('script' in changedValues) {
				currentFunction.script = changedValues.script || '';
			}
			if ('parameters' in changedValues) {
				currentFunction.parameters = changedValues.parameters || '';
			}
			updateFunction(currentFunction);
		}
	}

	const addFunction = () => {
		pluginFunctionForm.resetFields();
		let no = newFunctionNo;
		let newFunctionName: string;
		do {
			newFunctionName = 'New Function' + no;
			no++;
		} while (plugin.functions?.find((item: FunctionInfo) => item.name === newFunctionName));
		const id = generateUUID();
		plugin.functions?.push({
			id: id,
			name: 'New Function' + newFunctionNo,
			new: true,
		} as FunctionInfo);
		setNewFunctionNo(no);
		setPlugin({...plugin});
		setSelectedKeys(['function:' + id]);
		setEditPlugin(false);
	}

	const variables_columns: ProColumns<VariableInfo>[] = [
		{
			title: t('变量名'),
			dataIndex: 'name',
			formItemProps: () => {
				return {
					rules: [{required: true, message: '此项为必填项'}],
				};
			},
			width: '40%',
		},
		{
			title: t('变量值'),
			dataIndex: 'value',
			formItemProps: () => {
				return {
					rules: [{required: true, message: '此项为必填项'}],
				};
			},
			width: '40%',
		},
		{
			title: t('操作'),
			valueType: 'option',
			width: 200,
			render: (text, record, _, action) => [
				<a
					key="editable"
					onClick={() => {
						action?.startEditable?.(record.id);
					}}
				>
					编辑
				</a>,
				<a
					key="delete"
					onClick={() => {
						const variableInfos = pluginForm.getFieldValue(
							'variables',
						) as VariableInfo[];
						pluginForm.setFieldsValue({
							variables: variableInfos.filter((item) => item.id !== record.id),
						});
					}}
				>
					删除
				</a>,
			],
		},
	];

	return (
		<Spin spinning={spinning}>
			<div className={styles.plugin_edit}>
				<div className={joinTrim([styles.plugin_edit_menu,
					documentResize.width < 768 ? styles.plugin_edit_menu_xs : undefined,
					documentResize.width < 768 && !menuCollapsed ? styles.plugin_edit_menu_collapsed : undefined
				])}
				>
					<Menu
						// mode="inline"
						items={menuItems}
						defaultSelectedKeys={['plugin']}
						selectedKeys={selectedKeys}
						inlineCollapsed={menuCollapsed}
						onClick={(e) => {
							setEditPlugin(e.key === 'plugin');
							setSelectedKeys([e.key]);
						}}
					/>
					{menuCollapsed ? (
						<RightOutlined className={styles.plugin_edit_menu_collapsed_button}
									   onClick={() => setMenuCollapsed(!menuCollapsed)}
						/>
					) : (
						<LeftOutlined className={styles.plugin_edit_menu_collapsed_button}
									  onClick={() => setMenuCollapsed(!menuCollapsed)}
						/>
					)}
				</div>
				<div className={joinTrim([styles.plugin_edit_content,
					documentResize.width < 768 ? styles.plugin_edit_content_xs : undefined,
				])}
				>
					{editPlugin && (
						<ProForm
							form={pluginForm}
							onFinish={handlePluginFormFinish}
							onValuesChange={handlePluginFormValuesChange}>
							<ProForm.Item name="name" label={t('插件名称')} required
										  rules={[{required: true}, {max: 64}]}>
								<Input placeholder="The name of the plugin" maxLength={64}/>
							</ProForm.Item>
							<ProForm.Item name="avatar" label={t('插件头像')}
										  rules={[{max: 255}, {pattern: /^(https?|ftp):\/\//i}]}>
								<Input placeholder="Plugin avatar url" maxLength={255}/>
							</ProForm.Item>
							<ProForm.Item name="description" label={t('插件描述')} required rules={[{required: true}]}>
								<CodeInput height="400px" placeholder="Describe what this plugin can do, support Markdown syntax"
										   language="markdown"/>
							</ProForm.Item>
							<ProForm.Item
								label={t('插件变量')}
								name="variables"
								trigger="onValuesChange"
							>
								<EditableProTable<VariableInfo>
									rowKey="id"
									toolBarRender={false}
									maxLength={20}
									columns={variables_columns}
									recordCreatorProps={{
										newRecordType: 'dataSource',
										position: 'bottom',
										creatorButtonText: t('添加变量'),
										record: () => ({
											id: Date.now(),
											name: '',
											value: '',
										}),
									}}
									editable={{
										type: 'multiple',
										editableKeys,
										onChange: setEditableRowKeys,
										actionRender: (row, _, dom) => {
										  return [dom.delete];
										},
									}}
								/>
							</ProForm.Item>
						</ProForm>
					)}

					{!editPlugin && (
						<ProForm
							form={pluginFunctionForm}
							onValuesChange={handlePluginFunctionFormValuesChange}
							onFinish={handlePluginFunctionFormFinish}
							submitter={{
								render: (_, doms) => {
									return [
										...doms,
										<Button key="delete" type="primary" danger
												onClick={handleDeleteFunction}> {t('删除')} </Button>
									]
								}
							}}
						>
							<ProForm.Item name="name" label={t('方法名称')} required
										  rules={[{required: true}, {
											  pattern: /^[a-zA-Z0-9_]{1,64}$/
										  }]}
							>
								<Input
									placeholder="Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64."
									maxLength={64}
								/>
							</ProForm.Item>
							<ProForm.Item name="description" label={t('方法描述')} required
										  rules={[{required: true}, {max: 255}]}>
								<Input.TextArea placeholder="The description of what the function does."
												maxLength={255}/>
							</ProForm.Item>
							<ProForm.Item name="parameters" label={t('参数')} required
										  rules={[{required: true}]}
							>
								<CodeInput language="json"
										   placeholder="The parameters the functions accepts, described as a JSON Schema object."
										   onError={(error) => pluginFunctionForm.setFields([
											   {name: 'parameters', errors: [error.message], validated: true}])}
								/>
							</ProForm.Item>
							<ProForm.Item name="script" label={t('方法')} required rules={[{required: true}]}
										  validateStatus="error">
								<CodeInput placeholder="The method here will be called" onError={(error) => {
									pluginFunctionForm.setFields([{name: 'script', errors: [error.message]}]);
								}}
								/>
							</ProForm.Item>
						</ProForm>
					)}
				</div>
			</div>
		</Spin>
	);
}

export default PluginEdit;
