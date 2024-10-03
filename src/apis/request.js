import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const service = axios.create({
    baseURL:'http://localhost:9999',
    timeout:5000
})
// 请求拦截器
service.interceptors.request.use(
    config => {
      const authStore = useAuthStore()
      if (authStore.token) {
        config.headers['Authorization'] = `Bearer ${authStore.token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { code, msg, data } = response.data
    if (code === 1) {
      return data
    } else {
      ElMessage.error(msg)
      return Promise.reject(new Error(msg))
    }
  },
  error => {
    ElMessage.error(error.response.data.message || '请求失败')
    return Promise.reject(new Error(error.response.data.message || '请求失败'))
  }
)

export default service