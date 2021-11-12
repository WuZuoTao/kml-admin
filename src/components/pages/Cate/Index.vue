<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
</el-breadcrumb>
  <el-button type="primary" style="margin-top:10px;margin-bottom:10px" @click="$router.push('/cate/add')">添加</el-button>
    <el-table :data="catelist" border style="width: 100%" :tree-props="{children:'children'}" row-key="id">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="catename" label="名称" width="180"> </el-table-column>
      <el-table-column prop="img" label="图标"> 
          <template slot-scope="scope">
              <img class="cateimg" :src="scope.row.img" alt="" >
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
            {{ scope.row.status == "1" ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            
          <el-button type="danger" @click="deleCate(scope.row.id)">删除</el-button>
        </template>
         </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Cate",
  data() {
    return {
      dialogVisible: false,
      catelist: [],
      delId:''
    };
  },
  mounted() {
      this.getCateList()
  },
  methods: {
    // 编辑按钮
    edit(id){
      this.$router.push('/cate/' + id)
    },
    getCateList(){
        this.$axios.get('/api/catelist',{params:{istree:1}})
        .then(res => {
            this.catelist = res.data.list
        }).catch(err => {
            console.log(err)
        })
    },
     // 删除按钮
    deleCate(id){
     let c = confirm('你确定删除吗？')
      if(c){
        this.$axios.post('/api/catedelete',{id:id })
          .then(res => {
            if(res.data.code === 200){
              this.catelist = res.data.list
            }
        }).catch(err => console.log(err))
      }
    }
  }
};
</script>

<style scoped>
.cateimg{
    width: 80px;
}
</style>