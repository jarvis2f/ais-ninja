import {CommentOutlined, DeleteOutlined} from '@ant-design/icons'
import {Button, message, Modal, Popconfirm, Select, Space} from 'antd'
import {useLayoutEffect, useMemo, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import styles from './index.module.less'
import {chatStore, configStore, userStore} from '@/store'
import RoleLocal from './components/RoleLocal'
import AllInput from './components/AllInput'
import ChatMessage from './components/ChatMessage'
import Plugin from './components/Plugin'
import {RequestChatOptions} from '@/types'
import {postChatCompletions} from '@/request/api'
import Reminder from '@/components/Reminder'
import {filterObjectNull, formatTime, generateUUID, handleChatData} from '@/utils'
import {useScroll} from '@/hooks/useScroll'
import useDocumentResize from '@/hooks/useDocumentResize'
import Layout from '@/components/Layout'
import {pluginStore} from './components/Plugin/store';

function ChatPage() {
	const {t} = useTranslation()
	const scrollRef = useRef<HTMLDivElement>(null)
	const {scrollToBottomIfAtBottom, scrollToBottom} = useScroll(scrollRef.current)
	const {token, setLoginModal} = userStore()
	const {config, models, changeConfig, setConfigModal} = configStore()
	const bodyResize = useDocumentResize()
	const [pluginModal, setPluginModal] = useState({open: false})
	const [roleConfigModal, setRoleConfigModal] = useState({open: false})
	const [fetchController, setFetchController] = useState<AbortController | null>(null)
	const {debug} = pluginStore()
	const {
		chats,
		addChat,
		delChat,
		clearChats,
		selectChatId,
		changeSelectChatId,
		setChatInfo,
		setChatDataInfo,
		clearChatMessage,
		delChatMessage
	} = chatStore()

	useLayoutEffect(() => {
		if (scrollRef) {
			scrollToBottom()
		}
	}, [scrollRef.current, selectChatId, chats])

	// 当前聊天记录
	const chatMessages = useMemo(() => {
		const chatList = chats.filter((c) => c.id === selectChatId)
		if (chatList.length <= 0) {
			return []
		}
		return chatList[0].data
	}, [selectChatId, chats])

	// 创建对话按钮
	const CreateChat = () => {
		return (
			<Button
				block
				type="dashed"
				style={{
					marginBottom: 6,
					marginLeft: 0,
					marginRight: 0
				}}
				onClick={() => {
					if (!token) {
						setLoginModal(true)
						return
					}
					addChat()
				}}
			>
				{t('新建对话')}
			</Button>
		)
	}

	// 对接服务端方法
	async function serverChatCompletions({
											 requestOptions,
											 signal,
											 userMessageId,
											 assistantMessageId
										 }: {
		userMessageId: string
		signal: AbortSignal
		requestOptions: RequestChatOptions
		assistantMessageId: string
	}) {
		const response = await postChatCompletions(requestOptions, {
			options: {signal}
		}).then((res) => {
			return res
		}).catch((error) => {
			// 终止： AbortError
			console.log(error.name)
		})

		if (!(response instanceof Response)) {
			// 这里返回是错误 ...
			setChatDataInfo(selectChatId, userMessageId, {
				status: 'error'
			})
			setChatDataInfo(selectChatId, assistantMessageId, {
				status: 'error',
				text: `\`\`\`json
${JSON.stringify(response, null, 4)}
\`\`\`
`
			})
			fetchController?.abort()
			setFetchController(null)
			message.error(t('请求失败'))
			return
		}

		const reader = response.body?.getReader?.()
		let allContent = ''
		while (true) {
			const {done, value} = (await reader?.read()) || {}
			if (done) {
				fetchController?.abort()
				setFetchController(null)
				break
			}
			// 将获取到的数据片段显示在屏幕上
			const text = new TextDecoder('utf-8').decode(value)
			const texts = handleChatData(text)
			for (let i = 0; i < texts.length; i++) {
				const {dateTime, role, content, segment, plugin} = texts[i]
				allContent += content ? content : ''

				if (segment === 'stop' || segment === 'start' || segment === 'error') {
					setChatDataInfo(selectChatId, userMessageId, {
						status: 'pass'
					})
				}

				if (segment === 'stop') {
					setFetchController(null)
					setChatDataInfo(selectChatId, assistantMessageId, {
						text: allContent,
						dateTime,
						status: 'pass'
					})
					break
				}

				if (segment === 'start') {
					setChatDataInfo(selectChatId, assistantMessageId, {
						text: allContent,
						dateTime,
						status: 'loading',
						role,
						requestOptions
					})
				}

				if (segment === 'text') {
					setChatDataInfo(selectChatId, assistantMessageId, {
						text: allContent,
						dateTime,
						status: 'pass'
					})
				}

				if (!segment || segment === 'error') {
					setFetchController(null)
					setChatDataInfo(selectChatId, assistantMessageId, {
						text: allContent,
						dateTime,
						status: 'error'
					})
					break
				}

				if (segment && segment.startsWith('function')) {
					setChatDataInfo(selectChatId, assistantMessageId, {
						text: allContent,
						dateTime,
						role,
						plugins: [{
							...plugin,
							status: segment === 'function_stop' ? 'finish' : (segment === 'function_error' ? 'error' : 'process'),
						}],
					})
					if (plugin?.debug_info?.type) {
						let log = plugin.debug_info.content;
						if (typeof log === 'object') {
							try {
								log = JSON.stringify(log, null, 4)
							} catch (ignore) { /* empty */
							}
						}
						if (debug)
							console.log(`📣📣📣${plugin.debug_info.type} - [${plugin.name || ''}](${plugin.function?.name || ''})(${plugin.id})\n${log}`)
					}
				}
			}
			scrollToBottomIfAtBottom()
		}
	}

	// 对话
	async function sendChatCompletions(value: string) {
		if (!token) {
			setLoginModal(true)
			return
		}
		const parentMessageId = chats.filter((c) => c.id === selectChatId)[0].id
		const userMessageId = generateUUID()
		const requestOptions = {
			prompt: value,
			parentMessageId,
			options: filterObjectNull({
				...config
			}),
			debug: debug
		}
		setChatInfo(selectChatId, {
			id: userMessageId,
			text: value,
			dateTime: formatTime(),
			status: 'pass',
			role: 'user',
			requestOptions
		})
		const assistantMessageId = generateUUID()
		setChatInfo(selectChatId, {
			id: assistantMessageId,
			text: '',
			dateTime: formatTime(),
			status: 'loading',
			role: 'assistant',
			requestOptions
		})
		const controller = new AbortController()
		const signal = controller.signal
		setFetchController(controller)
		serverChatCompletions({
			requestOptions,
			signal,
			userMessageId,
			assistantMessageId
		})
	}

	return (
		<div className={styles.chatPage}>
			<Layout
				menuExtraRender={() => <CreateChat/>}
				route={{
					path: '/',
					routes: chats
				}}
				menuDataRender={(item) => {
					return item
				}}
				menuItemRender={(item, dom) => {
					const className =
						item.id === selectChatId ? `${styles.menuItem} ${styles.menuItem_action}` : styles.menuItem
					return (
						<div className={className}>
              <span className={styles.menuItem_icon}>
                <CommentOutlined/>
              </span>
							<span className={styles.menuItem_name}>{item.name}</span>
							<div className={styles.menuItem_options}>
								<Popconfirm
									title={t('删除会话')}
									description={t('确定删除会话吗？')}
									onConfirm={() => {
										delChat(item.id)
									}}
									okText="Yes"
									cancelText="No"
								>
									<DeleteOutlined/>
								</Popconfirm>
							</div>
						</div>
					)
				}}
				menuFooterRender={(props) => {
					//   if (props?.collapsed) return undefined;
					return (
						<Space direction="vertical" style={{width: '100%'}}>
							<Select
								size="middle"
								style={{width: '100%'}}
								defaultValue={config.model}
								value={config.model}
								options={models.map((m) => ({...m, label: t('AI模型: ') + m.label}))}
								onChange={(e) => {
									changeConfig({
										...config,
										model: e.toString()
									})
								}}
							/>
							<Button block onClick={() => {
								if (!token) {
									setLoginModal(true)
									return
								}
								setPluginModal({open: true});
							}}>
								{t('插件')}
							</Button>
							<Button block onClick={() => setRoleConfigModal({open: true})}>
								{t('角色配置')}
							</Button>
							<Button block onClick={() => setConfigModal(true)}>
								{t('对话配置')}
							</Button>
							<Popconfirm
								title={t('删除所有对话')}
								description={t('确定删除所有对话吗？')}
								onConfirm={clearChats}
								okText="Yes"
								cancelText="No"
							>
								<Button block danger type="dashed" ghost>
									{t('删除所有对话')}
								</Button>
							</Popconfirm>
						</Space>
					)
				}}
				menuProps={{
					onClick: (r) => {
						const id = r.key.replace('/', '')
						if (selectChatId !== id) changeSelectChatId(id)
					}
				}}
			>
				<div className={styles.chatPage_container}>
					<div ref={scrollRef} className={styles.chatPage_container_one}>
						<div id="image-wrapper">
							{chatMessages.map((item) => {
								return (
									<ChatMessage
										key={item.id}
										position={item.role === 'user' ? 'right' : 'left'}
										status={item.status}
										content={item.text}
										time={item.dateTime}
										model={item.requestOptions.options?.model}
										plugins={item.plugins}
										onDelChatMessage={() => delChatMessage(selectChatId, item.id)}
									/>
								)
							})}
							{chatMessages.length <= 0 && <Reminder/>}
						</div>
					</div>
					<div className={styles.chatPage_container_two}>
						<AllInput
							disabled={!!fetchController}
							onSend={(value) => {
								if (value.startsWith('/')) return
								sendChatCompletions(value)
								scrollToBottomIfAtBottom()
							}}
							clearMessage={() => clearChatMessage(selectChatId)}
							onStopFetch={() => {
								// 结束
								setFetchController((c) => {
									c?.abort()
									return null
								})
							}}
						/>
					</div>
				</div>
			</Layout>

			{/* 插件 */}
			<Modal
				title={t('插件')}
				open={pluginModal.open}
				footer={null}
				destroyOnClose
				onCancel={() => setPluginModal({open: false})}
				width={bodyResize.width <= 768 ? '100%' : '80%'}
				style={{
					top: 10
				}}
			>
				<Plugin/>
			</Modal>

			{/* AI角色预设 */}
			<Modal
				title={t('AI角色预设')}
				open={roleConfigModal.open}
				footer={null}
				destroyOnClose
				onCancel={() => setRoleConfigModal({open: false})}
				width={800}
				style={{
					top: 50
				}}
			>
				<RoleLocal/>

				{/* <Tabs
          tabPosition={bodyResize.width <= 600 ? 'top' : 'left'}
          items={[
            {
              key: 'roleLocal',
              label: '本地数据',
              children: <RoleLocal />
            },
            {
              key: 'roleNetwork',
              label: '网络数据',
              children: <RoleNetwork />
            }
          ]}
        /> */}
			</Modal>
		</div>
	)
}

export default ChatPage
