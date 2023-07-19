import {
	ApiKeyUsageInfo,
	CarmiInfo,
	ConfigInfo,
	MessageInfo,
	NotificationInfo,
	OrderInfo,
	Paging,
	PaymentInfo,
	ProductInfo,
	RequestAddCarmi,
	SigninInfo,
	TableData,
	TokenInfo,
	TurnoverInfo,
	UserInfo
} from '@/types/admin'
import request from '.'
import {MixModelInfo} from "@/types";

// 获取卡密列表
export function getAdminCarmi(params: Paging) {
	return request.get<TableData<Array<CarmiInfo>>>('/api/a/redemption_code', params)
}

// 检查卡密
export function getAdminCarmiCheck() {
	return request.get<TableData<Array<CarmiInfo>>>('/api/a/redemption_code/check')
}

// 删除卡密
export function delAdminCarmi(params: { id: string | number }) {
	return request.del(`/api/a/redemption_code/${params.id}`)
}

// 批量生产卡密
export function addAdminCarmis(params: RequestAddCarmi) {
	return request.post<Array<CarmiInfo>>('/api/a/redemption_code', params)
}

// 用户列表
export function getAdminUsers(params: Paging) {
	return request.get<TableData<Array<UserInfo>>>('/api/a/user', params)
}

// 删除用户
export function delAdminUsers(params: { id: string | number }) {
	return request.del(`/api/a/user/${params.id}`)
}

// 修改用户
export function putAdminUsers(params: UserInfo) {
	return request.put('/api/a/user', params)
}

// 用户消费列表
export function getAdminTurnovers(params: Paging) {
	return request.get<TableData<Array<TurnoverInfo>>>('/api/a/turnover', params)
}

// 删除用户消费记录
export function delAdminTurnover(params: { id: string | number }) {
	return request.del(`/api/a/turnover/${params.id}`)
}

// 修改用户消费记录
export function putAdminTurnover(params: TurnoverInfo) {
	return request.put('/api/a/turnover', params)
}

// 用户签到列表
export function getAdminSignin(params: Paging) {
	return request.get<TableData<Array<SigninInfo>>>('/api/a/signin', params)
}

// 用户对话列表
export function getAdminMessages(params: Paging) {
	return request.get<TableData<Array<MessageInfo>>>('/api/a/message', params)
}

// 商品列表
export function getAdminProducts(params: Paging) {
	return request.get<TableData<Array<ProductInfo>>>('/api/a/product', params)
}

// 删除商品
export function delAdminProduct(params: { id: string | number }) {
	return request.del(`/api/a/product/${params.id}`)
}

// 新增商品
export function postAdminProduct(params: ProductInfo) {
	return request.post('/api/a/product', params)
}

// 修改商品
export function putAdminProduct(params: ProductInfo) {
	return request.put('/api/a/product', params)
}

export function getTokenModels(supplier: string) {
	return request.get<Array<MixModelInfo>>(`/api/a/token/${supplier}/models`)
}

// 获取Token
export function getAdminTokens(params: Paging) {
	return request.get<TableData<Array<TokenInfo>>>('/api/a/token', params)
}

// 删除Token
export function delAdminToken(params: { id: string | number }) {
	return request.del(`/api/a/token/${params.id}`)
}

// 新增token
export function postAdminToken(params: TokenInfo) {
	return request.post('/api/a/token', params)
}

// 编辑token
export function putAdminToken(params: TokenInfo) {
	return request.put('/api/a/token', params)
}

// 检查token
export function postAdminTokenCheck(params: TokenInfo | { all: boolean }) {
	return request.post('/api/a/token/check', params)
}

// 获取配置数据
export function getAdminConfig() {
	return request.get<Array<ConfigInfo>>('/api/a/config')
}

// 修改配置数据
export function putAdminConfig(params: { configs: { name: string, value: string | number }[] }) {
	return request.put<Array<ConfigInfo>>('/api/a/config', params)
}

// 获取支付渠道
export function getAdminPayment(params: Paging) {
	return request.get<TableData<Array<PaymentInfo>>>('/api/a/payment', params)
}

// 删除渠道
export function delAdminPayment(params: { id: string | number }) {
	return request.del(`/api/a/payment/${params.id}`)
}

// 新增渠道
export function addAdminPayment(params: PaymentInfo) {
	return request.post('/api/a/payment', params)
}

// 编辑渠道
export function putAdminPayment(params: PaymentInfo) {
	return request.put('/api/a/payment', params)
}

// 获取订单列表
export function getAdminOrders(params: Paging) {
	return request.get<TableData<Array<OrderInfo>>>('/api/a/order', params)
}

// 获取 Notification
export function getAdminNotification(params: Paging) {
	return request.get<TableData<Array<NotificationInfo>>>('/api/a/notification', params)
}

// 删除 Notification
export function delAdminNotification(params: { id: string | number }) {
	return request.del(`/api/a/notification/${params.id}`)
}

// 新增 Notification
export function postAdminNotification(params: NotificationInfo) {
	return request.post('/api/a/notification', params)
}

// 编辑 Notification
export function putAdminNotification(params: NotificationInfo) {
	return request.put('/api/a/notification', params)
}

export function importPluginFunction(params: { url: string }) {
	return request.post(`/api/a/plugin/import`, params)
}

export function getAdminUsage(params: Paging) {
	return request.get<TableData<Array<ApiKeyUsageInfo>>>('/api/a/usage', params)
}
