import {chatStore, configStore, userStore} from '@/store'
import {configAsync} from '@/store/async'
import React, {useEffect, useLayoutEffect} from 'react'
import LoginModal from '../LoginModal'
import ConfigModal from '../ConfigModal'
import {ConfigProvider, notification, theme} from 'antd'
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import zh_CN from '@/locales/zh_CN.json';
import en_US from '@/locales/en_US.json';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

type Props = {
	children: React.ReactElement
}

function Global(props: Props) {
	const {models, config, configModal, changeConfig, setConfigModal, notifications} = configStore()
	const {chats, addChat, changeSelectChatId} = chatStore()
	const {language, loginModal, setLoginModal} = userStore()

	i18n.use(initReactI18next)
		.init({
			resources: {
				zh_CN: {
					translation: zh_CN
				},
				en_US: {
					translation: en_US
				}
			},
			lng: language,
			interpolation: {
				escapeValue: false
			}
		});

	const openNotification = ({
								  key,
								  title,
								  content
							  }: {
		key: string | number
		title: string
		content: string
	}) => {
		return notification.open({
			key,
			message: title,
			description: (
				<div
					dangerouslySetInnerHTML={{
						__html: content
					}}
				/>
			),
			onClick: () => {
				console.log('Notification Clicked!')
			}
		})
	}

	function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function onOpenNotifications() {
		if (!Array.isArray(notifications)) return;
		for (const item of notifications) {
			await openNotification({
				key: item.id,
				title: item.title,
				content: item.content
			})
			await delay(500)
		}
	}

	useEffect(() => {
		if (chats.length <= 0) {
			addChat()
		} else {
			const id = chats[0].id
			changeSelectChatId(id)
		}
		configAsync.fetchConfig()
	}, [])

	useLayoutEffect(() => {
		onOpenNotifications();
	}, [notification])

	return (
		<ConfigProvider
			locale={language === 'zh_CN' ? zhCN : enUS}
			theme={{
				token: {
					colorPrimary: '#8359E3',
				}
			}}
		>
			{props.children}
			<LoginModal
				open={loginModal}
				onCancel={() => {
					setLoginModal(false)
				}}
			/>
			<ConfigModal
				open={configModal}
				onCancel={() => {
					setConfigModal(false)
				}}
				models={models}
				onChange={changeConfig}
				data={config}
			/>
		</ConfigProvider>
	)
}

export default Global
