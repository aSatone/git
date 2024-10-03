<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <router-link to="/books">
          <el-icon><Search /></el-icon>
          <span>商城在售书籍</span>
          </router-link>
        </el-menu-item>
        <el-sub-menu mode="vertical" index="2">
              <template #title>
                <el-icon><location /></el-icon>
                <span>图书信息管理</span>
              </template>
              <el-menu-item-group title="书籍信息修改">
                <!-- <router-link to="/books/title">
                  <el-menu-item index="2-1">书名修改</el-menu-item>
                </router-link> -->
                <router-link to="/books/price">
                  <el-menu-item index="2-2">价格修改</el-menu-item>
                </router-link>
                <router-link to="/books/new">
                  <el-menu-item index="2-3">新增书籍</el-menu-item>
                </router-link>
                
              </el-menu-item-group>
              <el-menu-item-group title="书籍信息删除">
                <router-link to="/books/delete">
                  <el-menu-item index="2-4">删除书籍</el-menu-item>
                </router-link>
              </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu  index="3">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </template>
          <!-- <router-link to="/user/name">
            <el-menu-item index="3-1">修改用户名</el-menu-item>
          </router-link> -->
          <router-link to="/user/password">
            <el-menu-item index="3-2">修改密码</el-menu-item>
          </router-link>
        </el-sub-menu>
      </el-menu>
</template>
  
  <script setup>
    import{ Location } from '@element-plus/icons-vue'
    import{ Search } from '@element-plus/icons-vue'
    import{ UserFilled } from '@element-plus/icons-vue'
  </script>
  
  <style lang="scss" scoped></style>
  