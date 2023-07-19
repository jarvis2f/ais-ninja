import {ProFormDigit, ProFormText, ProFormTextArea, QueryFilter} from '@ant-design/pro-components'
import {Form, message, Space} from 'antd'
import {useEffect, useState} from 'react'
import styles from './index.module.less'
import {getAdminConfig, importPluginFunction, putAdminConfig} from '@/request/adminApi'
import {ConfigInfo} from '@/types/admin'

const modelRatioHelp = JSON.stringify(JSON.parse(`
{
    "模型名称": {
        "input": "提示倍率",
        "output": "完成倍率"
    },
    "模型名称2": "单倍率，如：嵌入模型(text-embedding-ada-002)",
    "dall-e": {
        "256*256": "openAI图形生成倍率 按照size设置"
    },
    "gpt-3.5-turbo": {
        "input": 1,
        "output": 1
    },
    "!SDXL": {
     "512*512": {
        "15": "非 SDXL 模型的 512*512 steps为15的倍率"
     }
   },
   "stable-diffusion-xl-1024-v0-9": {
     "15": "此模型只跟steps有关"
   },
   "stable-diffusion-xl-beta-v2-2-2": {
      "512*512": {
        "15": "非 SDXL 模型的 512*512 steps为15的倍率"
      }
   }
}
`), null, 2)
const userLevelRatioHelp = JSON.stringify(JSON.parse(`
{
  "NORMAL": 1,
  "VIP": 1,
  "PRO": 1,
  "BUSINESS": 1
}
`), null, 2)

function ConfigPage() {
	const [configs, setConfigs] = useState<Array<ConfigInfo>>([])

	const [siteInfoForm] = Form.useForm<{
		title: string
		logo: string
		description: string
		keywords: string
	}>()

	const [rewardForm] = Form.useForm<{
		register_reward: number | string
		signin_reward: number | string
		invitee_reward: number | string
		inviter_reward: number | string
	}>()

	const [historyMessageForm] = Form.useForm<{
		history_message_count: number | string
	}>()

	const [importPluginForm] = Form.useForm<{
		url: string
	}>()

	const [aiRatioForm] = Form.useForm<{
		model_ratio: string
		user_level_ratio: string
	}>()

	const [drawUsePriceForm] = Form.useForm<{
		draw_use_price: Array<{
			size: string
			integral: number
		}>
	}>()

	function getConfigValue(key: string, data: Array<ConfigInfo>) {
		return data.filter((c) => c.name === key)[0]
	}

	function onRewardFormSet(data: Array<ConfigInfo>) {
		const registerRewardInfo = getConfigValue('register_reward', data)
		const signinRewardInfo = getConfigValue('signin_reward', data)
		const inviteeRewardInfo = getConfigValue('invitee_reward', data)
		const inviterRewardInfo = getConfigValue('inviter_reward', data)
		const historyMessageCountInfo = getConfigValue('history_message_count', data)
		const drawUsePrice = getConfigValue('draw_use_price', data)
		const modelRatio = getConfigValue('model_ratio', data)
		const userLevelRatio = getConfigValue('user_level_ratio', data)
		const siteInfo = getConfigValue('site_info', data)
		rewardForm.setFieldsValue({
			register_reward: registerRewardInfo?.value || 0,
			signin_reward: signinRewardInfo?.value || 0,
			invitee_reward: inviteeRewardInfo?.value || 0,
			inviter_reward: inviterRewardInfo?.value || 0
		})
		historyMessageForm.setFieldsValue({
			history_message_count: Number(historyMessageCountInfo?.value || 10)
		})
		aiRatioForm.setFieldsValue({
			model_ratio: modelRatio.value,
			user_level_ratio: userLevelRatio.value
		})
		if (siteInfo && siteInfo.value) {
			const siteInfoValue = JSON.parse(siteInfo.value)
			siteInfoForm.setFieldsValue({
				title: siteInfoValue.title,
				logo: siteInfoValue.logo,
				description: siteInfoValue.description,
				keywords: siteInfoValue.keywords
			})
		}
		if (drawUsePrice && drawUsePrice.value) {
			drawUsePriceForm.setFieldsValue({
				draw_use_price: JSON.parse(drawUsePrice.value)
			})
		}
	}

	function onGetConfig() {
		getAdminConfig().then((res) => {
			if (res.code) {
				message.error('获取配置错误')
				return
			}
			onRewardFormSet(res.data)
			setConfigs(res.data)
		})
	}

	useEffect(() => {
		onGetConfig()
	}, [])

	async function onSave(values: { [key: string]: string | number }) {
		return putAdminConfig({
			configs: Object.entries(values).map(([key, value]) => {
				return {name: key, value: value};
			})
		}).then((res) => {
			if (res.code) {
				message.error('保存失败')
				return
			}
			message.success('保存成功')
			onGetConfig()
		})
	}

	const handleImportPlugin = async (values: { [key: string]: string | number }) => {
		const importUrl = values.url as string;
		// 判断是否git仓库地址
		if (!importUrl || !(/https?:\/\/github.com\/.+\/.+/i.test(importUrl))) {
			return;
		}
		await importPluginFunction({url: importUrl}).then((res) => {
			if (res.code) return
			message.success('导入成功')
		});
	}

	return (
		<div className={styles.config}>
			<Space
				direction="vertical"
				style={{
					width: '100%'
				}}
			>
				<div className={styles.config_form}>
					<h3>网站设置</h3>
					<QueryFilter
						form={siteInfoForm}
						onFinish={async (values: { [key: string]: string | number }) => {
							putAdminConfig({
								configs: [{
									name: 'site_info',
									value: JSON.stringify(values)
								}]
							})
								.then((res) => {
									if (res.code) {
										message.error('保存失败')
										return
									}
									message.success('保存成功')
									onGetConfig()
								})
						}}
						onReset={() => {
							onRewardFormSet(configs)
						}}
						size="large"
						collapsed={false}
						defaultCollapsed={false}
						requiredMark={false}
						defaultColsNumber={79}
						span={24}
						labelWidth={140}
						layout="vertical"
						searchText="保存"
						resetText="恢复"
					>
						<ProFormText
							name="title"
							label="网站标题"
						/>
						<ProFormText
							name="logo"
							label="网站 Logo"
						/>
						<ProFormTextArea
							name="description"
							label="网站 Description"
						/>
						<ProFormText
							name="keywords"
							label="网站 keywords"
						/>
					</QueryFilter>
				</div>
				<div className={styles.config_form}>
					<h3>奖励激励</h3>
					<QueryFilter
						form={rewardForm}
						onFinish={async (values: { [key: string]: string | number }) => {
							putAdminConfig({
								configs: Object.entries(values).map(([key, value]) => {
									return {name: key, value: value};
								})
							})
								.then((res) => {
									if (res.code) {
										message.error('保存失败')
										return
									}
									message.success('保存成功')
									onGetConfig()
								})
						}}
						onReset={() => {
							onRewardFormSet(configs)
						}}
						size="large"
						collapsed={false}
						defaultCollapsed={false}
						requiredMark={false}
						defaultColsNumber={79}
						searchText="保存"
						resetText="恢复"
					>
						<ProFormDigit
							name="register_reward"
							label="注册奖励"
							labelCol={{span: 8}}
							tooltip="新用户注册赠送积分数量"
							min={0}
							max={100000}
						/>
						<ProFormDigit
							name="signin_reward"
							label="签到奖励"
							labelCol={{span: 8}}
							tooltip="每日签到赠送积分数量"
							min={0}
							max={100000}
						/>
						<ProFormDigit
							name="invitee_reward"
							label="邀请者奖励"
							labelCol={{span: 8}}
							tooltip="邀请新用户注册赠送积分数量"
							min={0}
							max={100000}
						/>
						<ProFormDigit
							name="inviter_reward"
							label="受邀者奖励"
							labelCol={{span: 8}}
							tooltip="被邀请新用户注册赠送积分数量"
							min={0}
							max={100000}
						/>
					</QueryFilter>
				</div>
				<div className={styles.config_form}>
					<h3>历史记录</h3>
					<QueryFilter
						form={historyMessageForm}
						onFinish={onSave}
						onReset={() => {
							onRewardFormSet(configs)
						}}
						size="large"
						collapsed={false}
						defaultCollapsed={false}
						requiredMark={false}
						defaultColsNumber={79}
						searchText="保存"
						resetText="恢复"
					>
						<ProFormDigit
							name="history_message_count"
							label="携带数量"
							tooltip="会话上下文携带对话数量"
							min={1}
							max={100000}
						/>
					</QueryFilter>
				</div>
				<div className={styles.config_form}>
					<h3>倍率设置</h3>
					<p>
						单次对话 / API 调用的积分消耗 = (分组倍率 * 模型提示倍率 * 提示token数量) + (分组倍率 * 模型完成倍率
						* 完成token数量)
					</p>
					<p>
						单次图片 / API 调用的积分消耗 = 模型倍率 * 分组倍率 * (图片数量)
					</p>
					<p>
						用户四个等级，分别为：NORMAL(普通用户), VIP(会员用户), PRO(专业用户), BUSINESS(企业用户)
					</p>
					<p>
						格式为JSON，保存前建议到 <a href="https://www.json.cn/" target="_blank">JSON在线解析</a> 检查格式是否正确
					</p>
					<QueryFilter
						form={aiRatioForm}
						onFinish={onSave}
						onReset={() => {
							onRewardFormSet(configs)
						}}
						size="large"
						collapsed={false}
						defaultCollapsed={false}
						requiredMark={false}
						defaultColsNumber={85}
						searchText="保存"
						resetText="恢复"
					>
						<ProFormTextArea
							name="model_ratio"
							label="模型倍率"
							tooltip={{
								rootClassName: styles.model_ratio_tooltip,
								placement: 'top',
								title: (<pre style={{wordBreak: "break-word", width: '100%', minWidth: '100%'}}>
									{modelRatioHelp}
								</pre>)
							}}
							// initialValue={}
							fieldProps={{
								rows: 8
							}}
						/>
						<ProFormTextArea
							name="user_level_ratio"
							label="分组倍率"
							tooltip={(<pre style={{wordBreak: "break-word"}}>
									{userLevelRatioHelp}
								</pre>
							)}
							fieldProps={{
								rows: 8
							}}
						/>
					</QueryFilter>
				</div>
				{/*<div className={styles.config_form}>
					<h3>绘画积分扣除设置</h3>
					<p>分为三个规格 256x256 512x512 1024x1024 请分别设置, 如为设置则不扣除积分。</p>
					<ProForm
						form={drawUsePriceForm}
						onFinish={(values) => {
							values.draw_use_price = JSON.stringify(values.draw_use_price) as never
							return onSave(values as never)
						}}
						onReset={() => {
							onRewardFormSet(configs)
						}}
						size="large"
						requiredMark={false}
						isKeyPressSubmit={false}
						submitter={{
							searchConfig: {
								submitText: '保存',
								resetText: '恢复'
							}
						}}
					>
						<ProFormList
							creatorButtonProps={{
								creatorButtonText: '添加绘画规格扣除项'
							}}
							name="draw_use_price"
							min={1}
							max={3}
						>
							<ProFormGroup key="group">
								<ProFormText
									name="size"
									label="规格大小"
									rules={[
										{
											required: true
										}
									]}
								/>
								<ProFormDigit
									name="integral"
									label="消耗积分"
									min={0}
									max={100000}
									rules={[
										{
											required: true
										}
									]}
								/>
							</ProFormGroup>
						</ProFormList>
					</ProForm>
				</div>*/}
				<div className={styles.config_form}>
					<h3>导入插件</h3>
					<QueryFilter
						form={importPluginForm}
						onFinish={handleImportPlugin}
						submitter={{
							resetButtonProps: {
								style: {
									display: 'none'
								}
							}
						}}
						size="large"
						collapsed={false}
						defaultCollapsed={false}
						requiredMark={false}
						defaultColsNumber={79}
						searchText="导入"
					>
						<ProFormText
							name="url"
							label="git仓库地址"
						/>
					</QueryFilter>
				</div>
			</Space>
		</div>
	)
}

export default ConfigPage
