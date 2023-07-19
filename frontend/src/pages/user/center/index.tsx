import React, {useEffect, useMemo, useState} from 'react'
import {Button, Form, message, Space} from 'antd'
import {getCode, getInvited, getSigninList, postSignin} from '@/request/api'
import {userAsync} from '@/store/async'
import {configStore, userStore} from '@/store'
import styles from './index.module.less'
import {SigninInfo} from '@/types'
import {formatTime} from '@/utils'
import UserInfoCard from '@/components/UserInfoCard'
import {ModalForm, ProFormCaptcha, ProFormText} from '@ant-design/pro-components'
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons'
import {fetchUserPassword} from '@/store/user/async'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

const monthAbbreviations = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function UserCenter() {
	const {t} = useTranslation()
	const navigate = useNavigate()
	const {token, user_info} = userStore()
	const {user_introduce, inviter_reward, invitee_reward, server_domain} = configStore()
	const [userAccountForm] = Form.useForm()
	const [signinLoading, setSigninLoading] = useState(false)
	const [signinList, setSigninList] = useState<Array<SigninInfo>>([])
	const [invitedCount, setInvitedCount] = useState(0)

	const [userAccountModal, setUserAccountModal] = useState({
		open: false,
		title: '修改信息',
		type: ''
	})

	function onFetchSigninList() {
		if (!token) return
		getSigninList().then((res) => {
			if (res.code) return
			setSigninList(res.data)
		})
	}

	const monthDays = useMemo(() => {
		const year = new Date().getFullYear()
		const month = new Date().getMonth() + 1
		const daysInMonth = new Date(year, month, 0).getDate()
		const dateArray = Array.from({length: daysInMonth}, (_, i) => {
			const day = i + 1
			return formatTime('yyyy-MM-dd', new Date(`${year}-${month}-${day}`))
		})
		return dateArray
	}, [])

	const userMonthDays = useMemo(() => {
		const dataList = signinList.map((item) => {
			return formatTime('yyyy-MM-dd', new Date(item.create_time))
		})
		return dataList
	}, [signinList])

	const invite_url = useMemo(() => {
		if (!server_domain) {
			// 获取当前域名
			const {protocol, host} = window.location
			return `${protocol}//${host}/login?aff=${user_info?.invite_code}`
		} else {
			return `${server_domain}/login?aff=${user_info?.invite_code}`
		}
	}, [server_domain])

	useEffect(() => {
		onFetchSigninList()
	}, [])

	useEffect(() => {
		getInvited().then((res) => {
			if (res.code) return
			setInvitedCount(res.data?.invited_count);
		});
	}, [])

	return (
		<div className={styles.user_center}>
			<div className={styles.user_center_container}>
				<Space direction="vertical" style={{width: '100%'}}>
					{/* 用户信息 */}
					<UserInfoCard info={user_info}>
						<div className={styles.user_center_operate}>
							{/*<Button block*/}
							{/*		onClick={() => {*/}
							{/*			setUserAccountModal({*/}
							{/*				open: true,*/}
							{/*				title: '修改账号',*/}
							{/*				type: 'account'*/}
							{/*			})*/}
							{/*			userAccountForm.setFieldsValue({*/}
							{/*				account: user_info?.account*/}
							{/*			})*/}
							{/*		}}*/}
							{/*>*/}
							{/*	修改账号*/}
							{/*</Button>*/}
							<Button
								block
								type="dashed"
								danger
								onClick={() => {
									setUserAccountModal({
										open: true,
										title: t('重置密码'),
										type: 'password'
									})
									userAccountForm.setFieldsValue({
										account: user_info?.account
									})
								}}
							>
								{t('重置密码')}
							</Button>
						</div>
					</UserInfoCard>
					{user_introduce && (
						<div className={styles.user_center_card}>
							<h4>{t('公告')}</h4>
							<div
								dangerouslySetInnerHTML={{
									__html: user_introduce
								}}
							/>
						</div>
					)}
					<div className={`${styles.user_center_card}`}>
						<h4>{t('我的邀请码')}</h4>
						<div className={styles.user_center_invite}>
							<p className={styles.user_center_invite_intro}>{t('您可获得{{invitee_reward}}积分，您邀请的好友可获得{{inviter_reward}}积分', {invitee_reward, inviter_reward})}</p>
							<p className={styles.user_center_invite_code}>{user_info?.invite_code}</p>
							<Button
								type="primary"
								size="small"
								onClick={() => {
									if (user_info?.invite_code) {
										navigator.clipboard.writeText(invite_url);
										message.success(t('复制成功'));
									}
								}}
							>
								{t('复制邀请链接')}
							</Button>
							<p className={styles.user_center_invite_count}>
								{t('已邀请好友数量')}：{invitedCount}
							</p>
						</div>
					</div>
					{/* 签到区域 */}
					<div className={styles.user_center_card}>
						<h4>{t('签到日历')}（{formatTime('yyyy年MM月', new Date(monthDays[0]))}）</h4>
						<Space direction="vertical">
							<div className={styles.user_center_signin}>
								{monthDays.map((item) => {
									const itemClassName = userMonthDays.includes(item)
										? `${styles.user_center_signin_item} ${styles.user_center_signin_selectTtem}`
										: styles.user_center_signin_item
									return (
										<div key={item} className={itemClassName}>
											<p>{formatTime('dd', new Date(item)) === formatTime('dd') ? '今' : formatTime('dd', new Date(item))}</p>
											<p>{monthAbbreviations[Number(formatTime('MM', new Date(item))) - 1]}</p>
										</div>
									)
								})}
							</div>
							<Button
								loading={signinLoading}
								type="primary"
								block
								disabled={!!user_info?.is_signin}
								onClick={() => {
									setSigninLoading(true)
									postSignin()
										.then((res) => {
											if (res.code) return
											userAsync.fetchUserInfo()
											onFetchSigninList()
											message.success(res.message)
										})
										.finally(() => {
											setSigninLoading(false)
										})
								}}
							>
								{user_info?.is_signin ? t('今日已签到') : t('立即签到')}
							</Button>
						</Space>
					</div>
				</Space>
			</div>

			<ModalForm
				width={500}
				title={userAccountModal.title}
				open={userAccountModal.open}
				form={userAccountForm}
				modalProps={{
					destroyOnClose: true,
					onCancel: () => {
						setUserAccountModal((ua) => ({...ua, open: false}))
					},
					okText: t('提交')
				}}
				onFinish={(values) => {
					return fetchUserPassword(values)
						.then((res) => {
							if (res.code) return false
							message.success(t('重置成功'))
							navigate('/login')
							return true
						})
						.catch(() => {
							return false
						})
				}}
			>
				<ProFormText
					fieldProps={{
						size: 'large',
						prefix: <UserOutlined/>
					}}
					name="account"
					placeholder={t('账号')!}
					disabled
					rules={[
						{
							required: true,
							message: t('请输入有效的账号')!,
						}
					]}
				/>
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
						const account = userAccountForm.getFieldValue('account');
						debugger
						const is_email = account && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(account);
						const is_phone = account && /^1[3456789]\d{9}$/.test(account);
						if (!is_email && !is_phone) {
							userAccountForm.setFields([
								{
									name: 'account',
									errors: [t('请输入有效的账号')]
								}
							])
							return Promise.reject()
						}
						return new Promise((resolve, reject) =>
							getCode({source: account, type: is_email ? 'email' : 'phone'})
								.then(() => resolve())
								.catch(reject)
						)
					}}
				/>
				{userAccountModal.type === 'password' && (
					<ProFormText.Password
						name="password"
						fieldProps={{
							size: 'large',
							prefix: <LockOutlined className={'prefixIcon'}/>
						}}
						placeholder={t('请输入密码')!}
						rules={[
							{
								required: true,
								message: t('8位及以上至少包含一个字母和一个数字')!,
								pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/
							}
						]}
					/>
				)}

				{userAccountModal.type === 'account' && (
					<>
						<ProFormText
							fieldProps={{
								size: 'large',
								prefix: <MailOutlined/>
							}}
							name="new_account"
							placeholder="新邮箱"
							rules={[
								{
									required: true,
									message: '请输入电子邮箱',
									pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
								}
							]}
						/>
						<ProFormCaptcha
							fieldProps={{
								size: 'large',
								prefix: <LockOutlined/>
							}}
							captchaProps={{
								size: 'large'
							}}
							placeholder="验证码"
							captchaTextRender={(timing, count) => {
								if (timing) {
									return `${count} ${'获取验证码'}`
								}
								return '获取验证码'
							}}
							name="new_code"
							rules={[
								{
									required: true,
									message: '请输入验证码！'
								}
							]}
							onGetCaptcha={async () => {
								const new_account = userAccountForm.getFieldValue('new_account')
								if (!new_account || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(new_account)) {
									userAccountForm.setFields([
										{
											name: 'new_account',
											errors: ['请输入有效的邮箱地址']
										}
									])
									return Promise.reject()
								}
								return new Promise((resolve, reject) =>
									getCode({source: new_account, type: 'email'})
										.then(() => resolve())
										.catch(reject)
								)
							}}
						/>
					</>
				)
				}
			</ModalForm>
		</div>
	)
}

export default UserCenter
