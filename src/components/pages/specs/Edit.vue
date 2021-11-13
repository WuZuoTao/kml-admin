<template>
  <div class="edit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格管理</el-breadcrumb-item>
      <el-breadcrumb-item >商品{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top: 20px"
    >
      <el-form-item label="规格名称" style="width: 400px">
        <el-input v-model="form.specsname"></el-input>
      </el-form-item>

      <el-form-item label="规格属性" style="width:400px">
        <el-input 
          v-for="(item,index) in attrs" 
          :key="index" 
          v-model="attrs[index]"
        ></el-input>  
      </el-form-item>
      <el-button @click="attrs.push('')">添加规格</el-button>
      <el-form-item label="状态">
        <el-switch 
        v-model="form.status"
        :active-value="1"
        :inactive-value="0"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button @click="onCancel()">取消</el-button>
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
          specsname:"",
          status:""
      },
      attrs: [''],
    };
  },

  mounted() {
    let id = this.$route.params.id
    if(id){
      this.type = "编辑"
      this.getRoleInfo(id)
    }
    this.getspecsList()
  },

  methods: {
    getspecsList(){
       this.$axios.get('./api/specslist')
       .then(res => {
         this.roleList = res.data.list
       })
     },

    getRoleInfo(id){
      this.$axios.get('/api/specsinfo',{params:{id:id}})
      .then(res => {
        console.log("userinfo",res)
        this.form = res.data.list[0]
        this.attrs = res.data.list[0].attrs
      }).catch(Err => console.log(Err))
    },

    onCancel(){
      this.$router.push('/specs')
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //深拷贝
          let str = JSON.stringify(this.form)
          let data = JSON.parse(str)
          data.attrs = this.attrs.map(item => item).toString()

          //如果是编辑，则吧接口地址改为编辑的接口
          let url = "/api/specsadd"
          if(this.type === "编辑"){
         data.id = this.$route.params.id
           url = "/api/specsedit"
          }
          // axios请求，提交数据  
          this.$axios.post(url,data).then(res => {
            if(res.data.code === 200){
              this.$router.push('/specs')
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