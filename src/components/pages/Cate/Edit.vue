<template>
  <div class="edit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cate' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item >菜单{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top: 20px"
    >
      <el-form-item label="分类名称" style="width: 400px">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单">
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option :value="0" label="顶级菜单" />
          <el-option v-for="c in cateList" :key="c.id" :label="c.catename" :value="c.id" />
        </el-select>
      </el-form-item>
     <el-form-item>
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="handlChange"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
     </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status"
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
        pid: "", //上级分类的id
        catename:"", //分类名称
        status: "", //状态
      },
       img: "", //分类的图片
       cateList: [],
       dialogVisible:false,
       dialogImageUrl:''
    };
  },
  mounted() {
      this.getCateList()
      let id = this.$route.params.id
      if(id){
       this.getCateInfo(id)
      }
  },
  methods: {
    getCateList() {
      this.$axios
        .get("/api/catelist", { params: { istree: 1 } })
        .then(res => {
          this.cateList = res.data.list;
        })
        .catch((err) => err);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    handlChange(file){
        console.log(file)
        this.img = file.raw
    },
    //  编辑请求
    getCateInfo(id){
      this.$axios.get('/api/cateinfo',{params:{id:id}})
      .then(res => {
        this.form = res.data.list
        this.dialogImageUrl = res.data.list.img
        // this.dialogVisible = true;
      }).catch(Err => console.log(Err))
    },

    //取消按钮
    onCancel(){
      this.$router.push('/cate')
    },
    //提交按钮
   onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //深拷贝
          let str = JSON.stringify(this.form)
          let data = JSON.parse(str)
          //如果是编辑，则吧接口地址改为编辑的接口
          let url = "/api/cateadd"
          if(this.type === "编辑"){
            data.id = this.$route.params.id
           url = "/api/cateedit"
          }
          //吧要上传的数据转成formDate
          let formDate = new FormData()
          for(let key in data){
              formDate.append(key,data[key])
          }
          formDate.append('img',this.img)
          
          // axios请求，提交数据  
          this.$axios.post(url,formDate).then(res => {
            if(res.data.code === 200){
              this.$router.push('/cate')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>