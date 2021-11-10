<template>
  <div class="nav-menu">
    <el-menu
      default-active="2"
      active-text-color="#fff"
      class="el-menu-vertical-demo"
      router
      background-color="#001529"
      text-color="#999"
      unique-opened
    >
    <div class="logo">
        <img src="../../assets/kkb.png" alt="">
        开卖啦后台
    </div>
      <el-menu-item index="/home"
        ><i class="el-icon-menu"></i>
        <span slot="title">首页</span></el-menu-item
      >
      <el-submenu index="1">
        <template slot="title"
          ><i class="el-icon-menu"></i>
          <span slot="title">系统设置</span></template
        >
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/admin">管理员管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Nav-Menu",
};
</script>

<style scoped>
.logo{
    height: 70px;
    color: #fff;
    font-size: 20px;
    line-height: 70px;
    text-align: center;
}
.logo img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
}
.nav-menu{
    height: 100%;
    background: #000 ;
}
.el-menu{
    width: 200px;
}
</style>