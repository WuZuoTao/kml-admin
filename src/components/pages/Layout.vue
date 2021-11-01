<template>
  <div>
      <el-container>
          <el-aside width="200px">Aside</el-aside>
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
export default {
    name: 'Layout'
}
</script>

<style>

</style>