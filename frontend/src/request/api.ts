import {
  FunctionInfo,
  PluginInfo,
  ProductInfo,
  RequesPrepay,
  RequestChatOptions,
  RequestLoginParams,
  RequestSocialLoginParams,
  ResponseConfigData,
  ResponseLoginData,
  SigninInfo,
  TurnoverInfo,
  UserInfo
} from '@/types'
import request from '.'
import {TableData} from "@/types/admin";

// 获取验证码
export function getCode(params: { source: string }) {
  return request.get('/api/u/code/send', params)
}

// 登陆
export function postLogin(params: RequestLoginParams) {
  return request.post<ResponseLoginData>('/api/u/login', params)
}

// google登陆
export function postSocialLogin(params: RequestSocialLoginParams) {
  return request.post<ResponseLoginData>('/api/u/login/social', params)
}

// 获取用户信息
export function getUserInfo() {
  return request.get<UserInfo>('/api/u/user/info')
}

// 请求对话
export function postChatCompletions(
  params: RequestChatOptions,
  config?: {
    headers?: { [key: string]: any }
    options?: { [key: string]: any }
  }
) {
  return request.postStreams<Response>('/api/u/chat/completions', params, config)
}

// 请求绘画
export function postImagesGenerations(
  params: {
    image?: File | string;
    quantity: number;
    width: number;
    style?: string;
    draw_type: string;
    prompt: string;
    steps?: number;
    height: number;
    quality?: number
  },
  headers?: { [p: string]: any },
  options?: { [p: string]: any }
) {
  return request.post<Array<{ url: string }>>(
    '/api/u/images/generations',
    {...params},
    headers,
    options
  )
}

// 获取商品列表
export function getProduct() {
  return request.get<{
    products: Array<ProductInfo>,
    pay_types: Array<string>
  }>('/api/u/product')
}

// 获取用户消费记录
export function getUserTurnover(params: { page: number; page_size: number }) {
  return request.get<{ count: number; rows: Array<TurnoverInfo> }>('/api/u/turnover', params)
}

// 提交订单
export function postPayPrecreate(params: RequesPrepay) {
  return request.post<{
    order_id: string
    pay_url: string
    pay_key: string
    qrcode?: string
  }>('/api/u/pay/precreate', params)
}

// 卡密充值
export function postUseCarmi(params: { carmi: string }) {
  return request.post('/api/u/use_carmi', params)
}

// 签到
export function postSignin() {
  return request.post('/api/u/signin')
}

// 获取签到列表
export function getSigninList() {
  return request.get<Array<SigninInfo>>('/api/u/signin/list')
}

// 重置用户密码
export function putUserPassword(params: RequestLoginParams) {
  return request.put('/api/u/user/password', params)
}

// 获取配置数据
export function getConfig() {
  return request.get<ResponseConfigData>('/api/u/config')
}

// 插件
export function getPlugins(params: { page: number; page_size: number, type: string }) {
  return request.get<TableData<PluginInfo>>('/api/u/plugins', params)
}

export function getPlugin(id: string) {
  return request.get<PluginInfo>(`/api/u/plugin/${id}`)
}

export function installPlugin(id: string) {
  return request.post(`/api/u/plugin/${id}/install`)
}

export function uninstallPlugin(id: string) {
  return request.post(`/api/u/plugin/${id}/uninstall`)
}

export function releasePlugin(id: string) {
  return request.post(`/api/u/plugin/${id}/release`)
}

export function postPlugin(params: { name: string, description: string, avatar: string }) {
  return request.post<PluginInfo>('/api/u/plugin', params)
}

export function putPlugin(id: string, params: { name: string, description: string, avatar: string }) {
  return request.put<PluginInfo>(`/api/u/plugin/${id}`, params)
}

export function deletePlugin(id: string) {
  return request.del(`/api/u/plugin/${id}`)
}

export function postPluginFunction(plugin_id: string, params: { name: string, description: string, parameters: string, script: string }) {
  return request.post<FunctionInfo>(`/api/u/plugin/${plugin_id}/function`, params)
}

export function putPluginFunction(plugin_id: string, id: string, params: { name: string, description: string, parameters: string, script: string }) {
  return request.put<FunctionInfo>(`/api/u/plugin/${plugin_id}/function/${id}`, params)
}

export function deletePluginFunction(plugin_id: string, id: string) {
  return request.del(`/api/u/plugin/${plugin_id}/function/${id}`)
}
