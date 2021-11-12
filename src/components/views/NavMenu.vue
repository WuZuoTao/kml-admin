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
        <span slot="title">首页</span></el-menu-item>
      <el-submenu :index="i.toString()"
      v-for="(m,i) in userinfo.menus" :key="m.id">
        <template slot="title"  
          ><i :class="m.icon"></i>
          <span slot="title">{{m.title}}</span></template
        >
        <el-menu-item
         v-for="item in m.children" 
        :key="item.id" 
        :index="item.url" 
        >{{item.title}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Nav-Menu",
  computed:{
    ...mapState(["userinfo"])
  }
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