import axios from 'axios'
import useLoginStore from '@/store/login/login'
import { ElMessage } from 'element-plus'

const loginStore = useLoginStore()
const service = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入token
    if (!loginStore.token) {
      // 登出操作
      loginStore.logout()
      return Promise.reject(new Error('token 失效'))
      // 如果token存在 注入token
    }
    config.headers.Authorization = `Bearer ${loginStore.token}`
    // 配置接口国际化
    // config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response, 'response...')

    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      // token超时
      loginStore.logout()
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
