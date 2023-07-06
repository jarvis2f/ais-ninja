import { getProduct } from '@/request/api'
import shopStore from './slice'

async function fetchProduct() {
  const res = await getProduct()
  if (!res.code) {
    shopStore.getState().changeGoodsList([...res.data.products])
	await shopStore.getState().changePayTypes([...res.data.pay_types])
  }
  return res
}

export default {
  fetchProduct
}
