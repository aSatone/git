import { defineStore } from "pinia";
// import { login as loginApi } from "@/apis/login"
import axios from "axios";
import { ElMessage } from 'element-plus'
import router from "@/router";

export const useAuthStore = defineStore('auth',{
    state:()=>({
        token:localStorage.getItem('token') ||'',
        username:localStorage.getItem('username')||''
    }),
    actions: {
        async login(username, password) {
          try {
            const response = await axios.post('http://localhost:9999/login', {
              username,
              password
            })
            const { code, msg, data } = response.data
            if (code === 1) {
              this.token = data
              this.username = username
              localStorage.setItem('token', this.token)
              localStorage.setItem('username',this.username)
              ElMessage.success('登录成功')
              router.push('/')
            } else {
              throw new Error(msg)
            }
          } catch (error) {
            ElMessage.error('登录失败，请检查用户名和密码')
          }
        },
        logout() {
          this.token = null
          this.username = ''
          localStorage.removeItem('token')
          ElMessage.success('已登出')
          router.push('/login')
        },
        loadStoredData() {
          const token = localStorage.getItem('token')
          const username = localStorage.getItem('username')
          if (token) {
            this.token = token
          }
          if (username) {
            this.username = username
          }
        }
      }
    })