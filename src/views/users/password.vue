<template>
  <div class="change-password-container">
    <h2>修改密码</h2>
    <el-form
      ref="changePasswordForm"
      :model="form"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="validateForm" size="medium">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth';

const { username } = useAuthStore()

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const changePasswordForm = ref(null)

const rules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const validateForm = async () => {
  try {
    const valid = await changePasswordForm.value.validate()
    if (valid) {
      await handleChangePassword()
    }
  } catch (error) {
    // ElMessage.error(error.message||'表单提交错误')
  }
}

const handleChangePassword = async () => {
  try {
    const { oldPassword, newPassword } = form.value
    console.log(username)
    const response = await axios.put('http://localhost:9999/password', {
      username,
      oldPassword,
      newPassword
    })
    const { code, msg } = response.data
    if (code === 1) {
      ElMessage.success('密码修改成功')
      // 清空表单
      form.value.oldPassword = ''
      form.value.newPassword = ''
      form.value.confirmPassword = ''
    } else {
      ElMessage.error(msg || '密码修改失败')
    }
  } catch (error) {
    ElMessage.error('密码修改失败，请稍后重试')
  }
}
</script>

<style scoped>
.change-password-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.change-password-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
