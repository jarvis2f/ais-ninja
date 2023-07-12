import {useRoutes} from 'react-router-dom'
import {adminRouter, webRouter} from '@/routers'
import {useMemo} from 'react'
import {userStore} from '@/store'


function App() {
  const { user_info } = userStore()

  const routers: Array<any> = useMemo(() => {
    let routerList = [...webRouter]
    if (user_info?.role === 'administrator') {
      routerList = [...routerList, ...adminRouter]
    }
    return routerList
  }, [user_info])

  return useRoutes([...routers]);
}

export default App
