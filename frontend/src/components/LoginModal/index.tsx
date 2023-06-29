import {getCode} from '@/request/api'
import {userAsync} from '@/store/async'
import {RequestLoginParams} from '@/types'
import {LockOutlined, RobotOutlined,} from '@ant-design/icons'
import {LoginForm, ProFormCaptcha, ProFormText} from '@ant-design/pro-form'
import {Form, FormInstance, Modal, Space, Tabs} from 'antd'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {GoogleSignIn} from '@/components/GoogleSignIn';
import {configStore, userStore} from "@/store";

type Props = {
	open: boolean
	onCancel: () => void
}

type LoginType = 'code' | 'password' | string;

export function LoginCard(props: {
	form: FormInstance<RequestLoginParams>
	onSuccess: () => void
}) {
	const {t} = useTranslation()
	const {social} = configStore();

	const [loginType, setLoginType] = useState<LoginType>('code');
	const {setLoginModal} = userStore();
	return (
		<LoginForm<RequestLoginParams>
			form={props.form}
			logo={import.meta.env.VITE_APP_LOGO}
			title=""
			subTitle={t('全网最便宜的人工智能对话')}
			actions={(
				<Space>
					{t('其他登录方式')}
					{social?.google.client_id && (
						<GoogleSignIn clientId={social?.google.client_id!} onSuccess={props.onSuccess}/>
					)}
				</Space>
			)}
			contentStyle={{
				width: '100%',
				maxWidth: '340px',
				minWidth: '100px'
			}}
			onFinish={async (e) => {
				return new Promise((resolve, reject) => {
					userAsync
						.fetchLogin({...e})
						.then((res) => {
							if (res.code) {
								reject(false)
								return
							}
							props.onSuccess?.()
							resolve(true)
						})
						.catch(() => {
							reject(false)
						})
				})
			}}
		>
			<Tabs
				centered
				activeKey={loginType}
				onChange={(activeKey) => {
					setLoginType(activeKey)
				}}
				items={[
					{
						key: 'code',
						label: t('登录/注册')
					},
					{
						key: 'password',
						label: t('密码登录')
					}
				]}
			/>
			<ProFormText
				fieldProps={{
					size: 'large',
					prefix: <RobotOutlined/>
				}}
				placeholder={t('邮箱')!}
				name="account"
				rules={[
					{
						required: true,
						message: t('请输入电子邮箱')!
					}
				]}
			/>
			{
				loginType === 'code' && (
					<ProFormCaptcha
						fieldProps={{
							size: 'large',
							prefix: <LockOutlined/>
						}}
						captchaProps={{
							size: 'large'
						}}
						placeholder={t('验证码')!}
						captchaTextRender={(timing, count) => {
							if (timing) {
								return `${count} ${t('获取验证码')}`
							}
							return t('获取验证码')
						}}
						name="code"
						rules={[
							{
								required: true,
								message: t('请输入验证码！')!
							}
						]}
						onGetCaptcha={async () => {
							const account = props.form.getFieldValue('account')
							if (!account) {
								props.form.setFields([
									{
										name: 'account',
										errors: [t('请输入有效的账号')]
									}
								])
								return Promise.reject()
							}
							return new Promise((resolve, reject) =>
								getCode({source: account})
									.then((res) => {
										if (res.code === -1) {
											reject(false)
											return
										}
										resolve()
									})
									.catch(reject)
							)
						}}
					/>
				)
			}
			{
				loginType === 'password' && (
					<ProFormText.Password
						name="password"
						fieldProps={{
							size: 'large',
							prefix: <LockOutlined className={'prefixIcon'}/>,
						}}
						placeholder={t('请输入密码')!}
						rules={[
							{
								required: true,
								message: t('8位及以上至少包含一个字母和一个数字')!,
								pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/
							},
						]}
					/>
				)
			}
			<div>
				<a href="/privacy-policy" style={{marginRight: '10px'}} onClick={() => setLoginModal(false)}>{t('隐私政策')}</a>
				<a href="/service-terms" onClick={() => setLoginModal(false)}>{t('服务条款')}</a>
			</div>
			<div
				style={{
					marginBlockEnd: 24
				}}
			/>
		</LoginForm>
	)
}

// 登录注册弹窗
function LoginModal(props: Props) {
	const [loginForm] = Form.useForm()

	const onCancel = () => {
		props.onCancel()
		loginForm.resetFields()
	}

	return (
		<Modal open={props.open} footer={null} destroyOnClose onCancel={onCancel}>
			<LoginCard form={loginForm} onSuccess={onCancel}/>
		</Modal>
	)
}

export default LoginModal
