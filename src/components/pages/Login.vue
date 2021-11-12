<template>
  <div class="login">
      <el-form :rules="rules" :model="form" ref="form">
        <h1>登入</h1>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
         <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登入</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'Login',
    data() {
      return {
        form:{
          username:"",
          password:""
        },
        rules:{
          username:[
            {required:true,message:"请输入用户名",trigger:'blur'},
            {min:3,max:10,message:"用户名不符合规范",trigger:"blur"}
          ],
          password:[
            {required:true,message:"请输入密码",trigger:'blur'},
            {min:3,max:10,message:"密码不符合规范",trigger:"blur"}
          ]
        }
      }
    },
    methods:{
      submitForm(){
        this.$refs['form'].validate( valid => {
          if(valid){
            this.userLogin(this.form)
            .then(res => {
              if(res.data.code === 200){
                //有值就跳转到对应的页面，没值就默认首页
                let target = this.$route.query.redirect || "/home"
                this.$router.push(target)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
      ...mapActions(['userLogin'])
    }
}
</script>

<style scoped>
.login{
  width: 500px;
  margin: 100px auto ;
  padding: 20px;
  box-shadow: 0 0 5px #ccc;
}
</style>