<template>
  <div class="add-book-container">
    <el-form ref="formRef" :model="form" label-width="80px" class="add-book-form">
      <div class="title-container">
        <h2 class="title">新增书籍</h2>
      </div>

      <el-form-item label="书名" prop="name" :rules="nameRules">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="作者" prop="author" :rules="authorRules">
        <el-input v-model="form.author"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price" :rules="priceRules">
        <el-input v-model="form.price" type="number"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addBook">新增书籍</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage, ElForm } from 'element-plus'

const form = ref({
  name: '',
  author: '',
  price: ''
})
const formRef = ref(null)
// 定义验证规则
const nameRules = [
  { required: true, message: '请输入书名', trigger: 'blur' }
]

const authorRules = [
  { required: true, message: '请输入作者', trigger: 'blur' }
]

const priceRules = [
  { required: true, message: '请输入价格', trigger: 'blur' },
  {
    validator: (rule, value, callback) => {
      if (isNaN(parseFloat(value))) {
        callback(new Error('价格必须为数字'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]
// const validateForm = async () => {  
//   try {  
//     await formRef.value.validate(async (valid) => {  
//       if (!valid) {  
//         throw new Error('表单验证失败');  
//       }  
//     });  
//   } catch (error) { 
//   }  
// }  
const validateForm = async () => {
  return await formRef.value.validate()
}

const addBook = async () => {
  try {
    await validateForm()//在发送到服务端之前确保表单已经通过验证
    const response = await axios.post('http://localhost:9999/books', form.value)
    const { code, msg } = response.data
    if (code === 1) {
      ElMessage.success('书籍新增成功')
      form.value = { name: '', author: '', price: '' } // 重置表单
    } else {
      ElMessage.error(msg)
    }
  } catch (error) {
  }
}


</script>

<style scoped>
.add-book-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.add-book-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.add-book-form {
  width: 100%;
}
</style>