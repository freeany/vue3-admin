import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'

const loginStore = useLoginStore()
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    responseFailureFn: (error) => {
      console.log(error, '???')

      // 处理 token 超时问题
      if (error.response && error.response.data && error.response.data.code === 401) {
        // token超时
        loginStore.logout()
      }
      ElMessage.error(error.message) // 提示错误信息
      return Promise.reject(error)
    }
  }
})

export default hyRequest
