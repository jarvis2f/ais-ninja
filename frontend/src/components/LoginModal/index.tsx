import {getCode} from '@/request/api'
import {userAsync} from '@/store/async'
import {RequestLoginParams} from '@/types'
import {CodepenOutlined, LockOutlined, RobotOutlined,} from '@ant-design/icons'
import {LoginForm, ProFormCaptcha, ProFormText} from '@ant-design/pro-form'
import {Form, FormInstance, Modal, Space, Tabs} from 'antd'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {GoogleSignIn} from '@/components/GoogleSignIn';
import {configStore, userStore} from "@/store";
import styles from './index.module.less'

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
	const {social, login_methods, site_info} = configStore();
	const [loginType, setLoginType] = useState<LoginType>();
	const [loginOptions, setLoginOptions] = useState<{ key: string, label: string }[]>([]);
	const {setLoginModal} = userStore();

	useEffect(() => {
		const options = [];
		options.push({
			key: 'password',
			label: t('密码登录')
		});
		if (login_methods?.includes('phone')) {
			options.push({
				key: 'phone',
				label: t('手机号注册')
			});
		}
		if (login_methods?.includes('email')) {
			options.push({
				key: 'email',
				label: t('邮箱注册')
			});
		}
		setLoginOptions(options);
		setLoginType(options[0].key);
	}, [login_methods]);

	useEffect(() => {
		// 获取链接上的邀请码
		const urlParams = new URLSearchParams(window.location.search);
		const inviteCode = urlParams.get('aff');
		if (inviteCode) {
			props.form.setFieldsValue({
				invite_code: inviteCode
			});
		}
	}, []);

	return (
		<div
			className={styles.login_form}
		>
			<LoginForm<RequestLoginParams>
				form={props.form}
				logo={site_info?.logo}
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
					items={loginOptions}
				/>
				<ProFormText
					fieldProps={{
						size: 'large',
						prefix: <RobotOutlined/>
					}}
					placeholder={loginType === 'email' ? t('邮箱')! : (loginType === 'phone' ? t('手机号') : t('账号'))!}
					name="account"
					rules={[
						{
							required: true,
							message: t('请输入您的账号')!
						}
					]}
				/>
				{(loginType === 'email' || loginType === 'phone') && (
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
								getCode({source: account, type: loginType})
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
				)}
				<ProFormText.Password
					name="password"
					fieldProps={{
						size: 'large',
						prefix: <LockOutlined className={'prefixIcon'}/>,
					}}
					placeholder={t('密码')!}
					rules={[
						{
							required: true,
							message: t('8位及以上至少包含一个字母和一个数字')!,
							pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/
						},
					]}
				/>
				{loginType !== 'password' && <ProFormText
					name="invite_code"
					fieldProps={{
						size: 'large',
						prefix: <CodepenOutlined className={'prefixIcon'}/>,
					}}
					placeholder={t('邀请码')!}
				/>}
				<div>
					<a href="/privacy-policy" style={{marginRight: '10px'}}
					   onClick={() => setLoginModal(false)}>{t('隐私政策')}</a>
					<a href="/service-terms" onClick={() => setLoginModal(false)}>{t('服务条款')}</a>
				</div>
				<div
					style={{
						marginBlockEnd: 24
					}}
				/>
			</LoginForm>
		</div>
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
