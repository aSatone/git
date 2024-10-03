import axios from 'axios'
import { ElMessage } from 'element-plus'

const searchBooks = async (query, currentPage, pageSize) => {
  try {
    const response = await axios.get('http://localhost:9999/search', {
      params: {
        name: query
      }
    })
    const { code, msg, data } = response.data
    if (code === 1) {
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = currentPage * pageSize
      const slicedData = data.slice(startIndex, endIndex)
      return { books: slicedData, total: data.length }
    } else {
      throw new Error(msg)
    }
  } catch (error) {
    ElMessage.error('查询书籍失败')
    throw new Error('查询书籍失败')
  }
}

const fetchAllBooks = async (currentPage, pageSize) => {
  try {
    const response = await axios.get('http://localhost:9999/books')
    const { code, msg, data } = response.data
    if (code === 1) {
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = currentPage * pageSize
      const slicedData = data.slice(startIndex, endIndex)
      return { books: slicedData, total: data.length }
    } else {
      throw new Error(msg)
    }
  } catch (error) {
    ElMessage.error('查询书籍失败')
    throw new Error('查询书籍失败')
  }
}

export { searchBooks, fetchAllBooks }
