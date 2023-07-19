import {
	delAdminToken,
	getAdminTokens,
	getTokenModels,
	postAdminToken,
	postAdminTokenCheck,
	putAdminToken
} from '@/request/adminApi';
import {TokenInfo} from '@/types/admin';
import {
	ActionType,
	ModalForm,
	ProColumns,
	ProFormGroup,
	ProFormRadio,
	ProFormSelect,
	ProFormText,
	ProTable
} from '@ant-design/pro-components';
import {Button, Form, message, Tag} from 'antd';
import {useRef, useState} from 'react';
import {MixModelInfo} from "@/types";

function TokenPage() {

	const tableActionRef = useRef<ActionType>();
	const [form] = Form.useForm<TokenInfo & {
		models: Array<string>
	}>();
	const [editInfoModal, setEditInfoModal] = useState<{
		open: boolean,
		info: TokenInfo | undefined
	}>({
		open: false,
		info: undefined
	});
	const [mixInfoModels, setMixInfoModels] = useState<Array<MixModelInfo>>([]);

	function handleSupplierChange(value: string) {
		if (!value) return;
		getTokenModels(value).then((res) => {
			if (res.code) return
			setMixInfoModels(res.data)
		});
	}

	const columns: ProColumns<TokenInfo>[] = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 60,
		},
		{
			title: '厂商',
			dataIndex: 'supplier',
			width: 80,
		},
		{
			title: 'KEY',
			dataIndex: 'key',
			width: 200,
		},
		{
			title: 'HOST',
			dataIndex: 'host',
			render: (_, data) => {
				return <a href={data.host} target="_blank" rel="noreferrer">{data.host}</a>
			}
		},
		{
			title: '可用模型',
			dataIndex: 'models',
			render: (_, data) => {
				if (!data.models) return '-'
				const modelTag = data.models.split(',').map((model) => {
					return <Tag key={model}>{model}</Tag>
				})
				return <>{modelTag}</>
			}
		},
		{
			title: '备注',
			dataIndex: 'remarks',
		},
		{
			title: '状态值',
			dataIndex: 'status',
			render: (_, data) => <Tag color={data.status ? 'green' : 'red'}>{data.status ? '正常' : '异常'}</Tag>
		},
		{
			title: '额度',
			dataIndex: 'limit',
			render: (_, data) => {
				if (data.supplier === 'openai') {
					return (
						<div>
							<p>总额度：{data.limit.toFixed(2)}</p>
							<p>已使用：{data.usage}</p>
							<p>还剩余：{(data.limit - data.usage).toFixed(2)}</p>
						</div>
					)
				} else if (data.supplier === 'stability') {
					return (
						<div>
							<p>剩余：{data.limit.toFixed(2)}</p>
						</div>
					)
				}
			}
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
		},
		{
			title: '操作',
			width: 160,
			valueType: 'option',
			fixed: 'right',
			render: (_, data) => [
				<Button
					key="edit"
					type="link"
					onClick={() => {
						setEditInfoModal(() => {
							const models = data.models ? data.models.split(',') : []
							form?.setFieldsValue({
								...data,
								models
							});
							handleSupplierChange(data.supplier)
							return {
								open: true,
								info: data
							}
						});
					}}
				>
					编辑
				</Button>,
				<Button
					key="del"
					type="text"
					danger
					onClick={() => {
						delAdminToken({
							id: data.id
						}).then((res) => {
							if (res.code) return
							message.success('删除成功')
							tableActionRef.current?.reload()
						})
					}}
				>
					删除
				</Button>
			]
		}
	];

	return (
		<div>
			<ProTable
				actionRef={tableActionRef}
				columns={columns}
				scroll={{
					x: 1200
				}}
				request={async (params, sorter, filter) => {
					// 表单搜索项会从 params 传入，传递给后端接口。
					const res = await getAdminTokens({
						page: params.current || 1,
						page_size: params.pageSize || 10,
					});
					return Promise.resolve({
						data: res.data.rows,
						total: res.data.count,
						success: true,
					});
				}}
				toolbar={{
					actions: [
						<Button
							key="primary"
							type="primary"
							size="small"
							onClick={() => {
								postAdminTokenCheck({all: true}).then(() => {
									message.success('提交刷新成功，请稍后在查询')
								});
							}}
						>
							异步刷新额度
						</Button>,
						<Button
							key="primary"
							type="primary"
							size="small"
							onClick={() => {
								setEditInfoModal(() => {
									return {
										open: true,
										info: undefined
									}
								});
							}}
						>
							新增Token
						</Button>
					]
				}}
				rowKey="id"
				search={false}
				bordered
			/>
			<ModalForm<TokenInfo & {
				models: Array<string>
			}>
				title="Token信息"
				open={editInfoModal.open}
				form={form}
				initialValues={{
					status: 1
				}}
				onOpenChange={(visible) => {
					if (!visible) {
						form.resetFields();
					}
					setEditInfoModal((info) => {
						return {
							...info,
							open: visible
						}
					})
				}}
				onFinish={async (values) => {
					console.log(values);
					const models = values.models.join(',')
					if (editInfoModal.info?.id) {
						console.log('进入编辑')
						const res = await putAdminToken({
							...values,
							models,
							id: editInfoModal.info?.id,
						});
						if (res.code) {
							message.error('编辑失败')
							return false;
						}
						tableActionRef.current?.reload?.();
					} else {
						const res = await postAdminToken({
							...values,
							models
						});
						if (res.code) {
							message.error('新增失败')
							return false
						}
						tableActionRef.current?.reloadAndRest?.();
						message.success('提交成功');
					}
					return true;
				}}
				size="large"
				modalProps={{
					cancelText: '取消',
					okText: '提交'
				}}
			>
				<ProFormText
					name="host"
					label="Host"
					placeholder="Host"
					rules={[{
						required: true,
						message: '请输入Host',
						pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*[^\/]$/i
					}]}
				/>
				<ProFormText
					name="key"
					label="Key"
					placeholder="Key"
					rules={[{required: true, message: '请输入Key'}]}
				/>
				<ProFormSelect
					name="supplier"
					label="厂商"
					request={async () => [
						{
							label: 'OpenAI',
							value: 'openai'
						},
						{
							label: 'Anthropic',
							value: 'anthropic'
						},
						{
							label: 'Stability',
							value: 'stability'
						},
					]}
					placeholder="请选择厂商"
					rules={[
						{
							required: true,
							message: '请选择厂商!',
						},
					]}
				/>
				<ProFormSelect
					shouldUpdate={(prevValues, curValues) => {
						const change = prevValues.supplier !== curValues.supplier;
						if (change && curValues.supplier)
							handleSupplierChange(curValues.supplier);
						return change;
					}}
					name="models"
					label="适用模型"
					options={mixInfoModels.map((item) => (
						{
							label: item.name,
							value: item.model
						}
					))}
					fieldProps={{
						mode: 'multiple',
					}}
					placeholder="请选择当前Token可用于的AI模型"
					rules={[
						{
							required: true,
							message: '请选择当前Token可用于的AI模型!',
							type: 'array',
						},
					]}
				/>
				<ProFormGroup>
					<ProFormRadio.Group
						name="status"
						label="状态"
						radioType="button"
						options={[
							{
								label: '下架',
								value: 0,
							},
							{
								label: '上架',
								value: 1,
							},
						]}
					/>
					<ProFormText
						name="remarks"
						label="备注"
						placeholder="备注"
					/>
				</ProFormGroup>
			</ModalForm>
		</div>
	)
}

export default TokenPage;
