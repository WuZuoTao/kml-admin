<template>
  <div class="edit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item >用户{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top: 20px"
      :rules="rules"
    >
      <el-form-item label="名称" style="width: 400px">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="form.roleid" placeholder="请选择角色 ">
          <el-option v-for="m in roleList" :key="m.id" :label="m.rolename" :value="m.id"></el-option>
        </el-select>
      </el-form-item>

          <el-form-item label="密码" style="width: 400px" >
        <el-input v-model="form.password" show-password placeholder="请输入密码" ></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status"
        :active-value="1"
        :inactive-value="0"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      type:"添加",
      form: {
        roleid: "", //
        username: "", //
        password: "", //
        status: "", //状态
      },
      rules: {
        title: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "菜单名称不符合规则", trigger: "blur" },
        ],
        pid: [
          { required: true, message: "上级才单不能为空", trigger: "change" },
        ],
      },
      roleList: [],
    };
  },

  mounted() {
    let id = this.$route.params.id
    console.log(this.$route.params)
    if(id){
      this.type = "编辑"
      this.getRoleInfo(id)
    }
    this.getroleList()
  },

  methods: {
    getroleList(){
       this.$axios.get('./api/rolelist')
       .then(res => {
         this.roleList = res.data.list
       })
     },

    getRoleInfo(id){
      this.$axios.get('/api/userinfo',{params:{uid:id}})
      .then(res => {
        console.log("userinfo",res)
        this.form = res.data.list
      }).catch(Err => console.log(Err))
    },


    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //深拷贝
          let str = JSON.stringify(this.form)
          let data = JSON.parse(str)

          //如果是编辑，则吧接口地址改为编辑的接口
          let url = "/api/useradd"
          if(this.type === "编辑"){
         data.id = this.$route.params.id
           url = "/api/useredit"
          }
          // axios请求，提交数据  
          this.$axios.post(url,data).then(res => {
            if(res.data.code === 200){
              this.$router.push('/admin')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log("roleList",this.roleList);
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>