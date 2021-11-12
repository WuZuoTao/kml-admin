<template>
      <el-container>
          <el-aside width="200px">
              <NavMenu/>
          </el-aside>
          <el-main>
              <el-header>
                  <header class="page-header">
                      <img src="../../assets/a1.png" class="avatar" alt="">
                  </header>
                  <el-dropdown>
                <span class="el-dropdown-link">
                    {{userinfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                   <span @click="logout"><el-dropdown-item >退出</el-dropdown-item></span> 
                </el-dropdown-menu>
                </el-dropdown>
              </el-header>
              <div class="content">
                  <router-view></router-view>
              </div>
          </el-main>
      </el-container>
</template>

<script>
import { mapState , mapMutations} from 'vuex'
import NavMenu from '../views/NavMenu.vue'
export default {
    name: 'Layout',
    components:{NavMenu},
    computed:{
        ...mapState(["userinfo"]),

    },
    methods:{
        logout(){
            this.userlogut()
            this.$router.push('/login')
        },
    ...mapMutations(["userlogut"])
    }
}
</script>

<style scoped>
.layout{
    height: 100%;
}
.el-container{
    height: 100%;
}
.el-main{
    padding: 0;
}
.el-header{
    box-shadow: 0 0 5px #ccc;
}
.content{
   margin: 20px;
}
.avatar {
    float: right;
    width: 40px;
    margin-top: 10px;
    margin-right: 80px;
}
</style>