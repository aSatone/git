<template>
  <div class="book-table-container">
    <div class="search-container">
      <el-input v-model="query" placeholder="输入书籍名称" style="width: 200px; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="searchBooksHandler">搜索</el-button>
      <el-button @click="fetchAllBooksHandler">查询所有书籍</el-button>
    </div>
    <el-table :data="books" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="name" label="书名" width="750"></el-table-column>
      <el-table-column prop="author" label="作者" width="300"></el-table-column>
      <el-table-column prop="price" label="价格/元" width="200"></el-table-column>
      <el-table-column label="操作" width="120">
        <template v-slot="scope">
          <el-button type="danger" size="small" @click="deleteBook(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="pagination-container">
      <el-pagination
      v-if="total > 0"
      class="mt-4"
      size="small"
      background
      :current-page="currentPage"
      :page-size="pageSize"
      layout=" prev, pager, next"
      :total="total"
      @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { searchBooks, fetchAllBooks } from '@/apis/Book';

const query = ref('')
const books = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

const searchBooksHandler = async () => {
  try{
    const { books: searchedBooks, total: totalCount} = await searchBooks(query.value, currentPage.value, pageSize.value)
    books.value = searchedBooks
    total.value = totalCount
  }catch(error){
    ElMessage.error('查询书籍失败')
  }
}

const fetchAllBooksHandler = async () => {
  try {
    const { books: allBooks, total: totalCount } = await fetchAllBooks(currentPage.value, pageSize.value)
    books.value = allBooks
    total.value = totalCount
  } catch (error) {
    ElMessage.error('查询书籍失败')
  }
}
// 初始化加载所有书籍
fetchAllBooksHandler()

const handlePageChange = (page) => {
  currentPage.value = page
  if (query.value) {
    searchBooksHandler()
  } else {
    fetchAllBooksHandler()
  }
}
const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:9999/books/${id}`)
    const { code, msg } = response.data
    if (code === 1) {
      ElMessage.success('书籍删除成功')
      // 刷新书籍列表
      if (query.value) {
        searchBooksHandler()
      } else {
        fetchAllBooksHandler()
      }
    } else {
      ElMessage.error(msg)
    }
  } catch (error) {
    ElMessage.error('删除书籍失败')
  }
}
</script>

<style scoped>
.book-table-container {
  padding: 20px;
}
.pagination-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
.el-pagination {
  margin-top: 20px;
}
.el-pagination__total {
  font-size: 14px;
  margin-right: 20px;
}
.el-pagination__jump {
  margin-left: 20px;
}
.el-table {  
  border-radius: 4px;
}
.search-container {  
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  margin-top: 20px;
}  
.search-container el-input {  
  margin-right: 0;  
}
</style>