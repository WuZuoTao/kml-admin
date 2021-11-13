<template>
  <div class="edit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item >商品{{type}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top: 20px"
    >
    <el-form-item label="商品名称" style="width: 400px">
      <el-input v-model="form.goodsname"></el-input>
    </el-form-item>

    <el-form-item label="一级分类">
      <el-select v-model="form.first_cateid" placeholder="请选择分类">
        <el-option v-for="c in cateList" :key="c.id" :label="c.catename" :value="c.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="二级分类">
      <el-select v-model="form.second_cateid" placeholder="请选择分类">
        <el-option v-for="s in sec_cateList" :key="s.id" :label="s.catename" :value="s.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="价格" style="width: 400px">
        <el-input v-model="form.price"></el-input>
    </el-form-item>

    <el-form-item label="市场价格" style="width: 400px">
        <el-input v-model="form.market_price"></el-input>
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
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
     </el-form-item>

     <el-form-item label="商品规格">
        <el-select v-model="form.specsid" placeholder="请选择商品规格">
          <el-option v-for="s in specsList" :key="s.id" :label="s.specsname" :value="s.id"></el-option>
        </el-select>
      </el-form-item>

       <el-form-item label="规格属性">
        <el-select v-model="form.specsattr" placeholder="请选择商品属性" multiple>
          <el-option v-for="s in sec_specsList" :key="s" :label="s" :value="s"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status"
        :active-value="1"
        :inactive-value="0"
        ></el-switch>
      </el-form-item>

      <el-form-item label="商品描述">
          <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: "Edit",
  data() {
    return {
      type:"添加",
      form: {
        first_cateid: "", // 一级分类编号
        second_cateid: "",// 二级分类编号
        goodsname: "", // 商品名称
        price: "", // 	商品价格
        market_price: "", // 市场价格
        description: "", // 商品描述
        specsid: "", // 商品规格编号
        specsattr: "", // 商品规格属性
        isnew: "", // 是否新品 1 ,2
        ishot: "", //是否热卖推荐 1, 2
        status: "", //状态
      },
        img: "", //商品图片（文件）
       cateList: [],
       specsList: [],
       dialogVisible:false,
       dialogImageUrl:'',
       editor:null
    };
  },
  mounted() {
      this.getCateList()
      this.getSpecsList()
      //初始化副文本编辑器
      this.editor = new E('#editor')
      this.editor.create()
      let id = this.$route.params.id
      if(id){
          this.deleteSpecs(id)
      }
  },
computed:{
      sec_cateList(){
          if(this.form.first_cateid){
            let arr = this.cateList.filter( item => item.id == this.form.first_cateid)
            return arr[0].children
          }else{
              return []
          }
      },
      sec_specsList(){
          if(this.form.specsid){
            let arr = this.specsList.filter( item => item.id == this.form.specsid)
            return arr[0].attrs
          }else{
              return []
          }
      },
  },
  methods: {
    //一级分类导航  cate请求
    getCateList() {
      this.$axios
        .get("/api/catelist", { params: { istree: 1 } })
        .then(res => {
          this.cateList = res.data.list;
        })
        .catch((err) => err);
    },
    //一级分类导航  specs
     getSpecsList() {
      this.$axios.get("/api/specslist")
        .then((res) => {
          this.specsList = res.data.list;
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
        this.img = file.raw
    },
    deleteSpecs(id){
        this.$axios.get('/api/goodsinfo',{params:{id:id}})
        .then(res => {
            this.form = res.data.list
        })
    },
    onCancel(){
      this.$router.push('/cate')
    },
   onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //深拷贝
          let str = JSON.stringify(this.form)
          let data = JSON.parse(str)

           data.description = this.editor.txt.html()
           console.log(this.form)
          //如果是编辑，则吧接口地址改为编辑的接口
          let url = "/api/goodsadd"
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
              this.$router.push('/goods')
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

<style scoped>
#editor{
    width: 100% ;
    height: 500px
}
</style>