<template>
  <div>
      <el-container>
          <el-aside width="200px">
              <NavMenu/>
          </el-aside>
          <el-main>
              <el-header>
                  <h1>开卖啦后台</h1>
              </el-header>
              <div>
                  <router-view></router-view>
              </div>
          </el-main>
      </el-container>
  </div>
</template>

<script>
import NavMenu from '../views/NavMenu.vue'
export default {
    name: 'Layout',
    components:{NavMenu}
}
</script>

<style>

</style>