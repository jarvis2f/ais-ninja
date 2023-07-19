import styles from './index.module.less'
import {ActionType, ModalForm, ProColumns, ProFormText, ProTable} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";
import {deleteAPIKey, getAPIKeys, postAPIKey} from "@/request/api";
import {APIKeyInfo} from "@/types";
import React, {useRef} from "react";
import {Button, Form, message} from "antd";
import {CopyFilled, DeleteOutlined, PlusOutlined} from "@ant-design/icons";

function UserApikey() {
	const {t} = useTranslation()
	const actionRef = useRef<ActionType>();
	const [apiKeyForm] = Form.useForm<{ name: string }>();
	const columns: ProColumns<APIKeyInfo>[] = [
		{
			title: t('名称'),
			dataIndex: 'name',
			key: 'name',
			ellipsis: true,
			width: 200,
		},
		{
			title: 'API Key',
			dataIndex: 'api_key',
			key: 'api_key',
			copyable: true,
			editable: false,
			render: (dom, record) => {
				let key = record.api_key;
				// 修改为只显示前5位和后5位，中间用*代替，前面拼接tk-
				key = "tk-" + key.substr(0, 5) + '********' + key.substr(key.length - 5);

				return (
					<div>
						<span>{key}</span>
						<a key={key}
						   onClick={() => {
							   navigator.clipboard.writeText("ts-" + record.api_key);
							   message.success(t('复制成功'));
						   }}
						>
							<CopyFilled/>
						</a>
					</div>
				)
			}
		},
		{
			title: t('创建时间'),
			dataIndex: 'create_time',
			key: 'create_time',
			editable: false,
		},
		{
			title: t('操作'),
			key: 'action',
			editable: false,
			width: 100,
			render: (text, record, _, action) => [
				<a key="delete"
				   onClick={() => {
					   console.log(record.id);
					   if (record.id) {
						   deleteAPIKey(record.id).then((res) => {
							   if (res.code) return;
							   actionRef.current?.reload();
						   });
					   }
				   }}
				>
					<DeleteOutlined/>
				</a>,
			]
		},
	];

	return (
		<div className={styles.apikey}>
			<div className={styles.apikey_help}>
				<p>
					{t('下面列出了您的 API 密钥。不要与他人共享您的 API 密钥，也不要在浏览器或其他客户端代码中公开它。')}
				</p>
				<p>
					{t('如果您的 API 密钥已泄露或您想要生成新的 API 密钥，您可以在下面创建一个新的 API 密钥。密钥使用方式与OpenAI API 官方一致，只需将您的 API 密钥放在 HTTP 请求的 Authorization 标头中即可，再将请求地址改为')}
					<span className={styles.apikey_help_host}>
						https://ais.ninja
						<a key="key_host" onClick={() => {
							navigator.clipboard.writeText("https://ais.ninja");
							message.success(t('复制成功'));
						}}
						>
							<CopyFilled/>
						</a>
					</span>
					{t('即可。')}
				</p>
			</div>
			<div className={styles.apikey_table}>
				<ProTable
					actionRef={actionRef}
					columns={columns}
					request={async (params, sorter, filter) => {
						const res = await getAPIKeys({page: params.current || 1, page_size: params.pageSize || 10});
						return Promise.resolve({
							data: res.data.rows,
							total: res.data.count,
							success: true,
						});
					}}
					toolBarRender={() => [
						<ModalForm<{ name: string }>
							title={t('创建新的API Key')}
							trigger={
								<Button
									key="button"
									icon={<PlusOutlined/>}
									onClick={() => {
										actionRef.current?.reload();
									}}
									type="primary"
								>
									{t('创建新的API Key')}
								</Button>
							}
							form={apiKeyForm}
							autoFocusFirstInput
							modalProps={{
								destroyOnClose: true,
								onCancel: () => console.log('run'),
							}}
							submitTimeout={2000}
							onFinish={async (values) => {
								await postAPIKey(values).then((res) => {
									if (res.code) return;
									message.success(t('创建成功'));
									actionRef.current?.reload();
								});
								return true;
							}}
						>
							<ProFormText
								name="name"
								label={t('自定义名称')}
								initialValue={t('新的Key')}
								fieldProps={{
									maxLength: 20,
								}}
								rules={[
									{
										required: true,
										message: t('此项为必填项')!,
									},
								]}
							/>
						</ModalForm>
					]}
					size="small"
					rowKey="id"
					search={false}
					scroll={{x: 800}}
				/>
			</div>
		</div>
	)
}

export default UserApikey;
