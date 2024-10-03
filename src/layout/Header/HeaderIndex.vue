<template>
  <div class="navbar">
    <div>
        <h1>书城后台管理系统</h1>
    </div>
    <div class="navbar-right">
      <el-button type="info" @click="logout">退出登录</el-button>
    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
// import { ElMessage } from 'element-plus';
//  import router from '@/router';

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>