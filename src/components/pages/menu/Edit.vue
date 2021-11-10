<template>
  <div class="edit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu'}">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单添加</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Edit",
};
</script>

<style>
</style>