<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>角色管理</el-breadcrumb-item>
</el-breadcrumb>
  <el-button type="primary" style="margin-top:10px;margin-bottom:10px" @click="$router.push('/role/add')">添加</el-button>
    <el-table :data="rolelist" border style="width: 100%" row-key="id">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="rolename" label="名称" width="180"> </el-table-column>
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
          <el-button type="danger" @click="deleRole(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "v-menu",
  data() {
    return {
      dialogVisible: false,
      rolelist: [],
      delId:''
    };
  },
  mounted() {
   this.getroleList()
  },

  methods: {
     getroleList(){
       this.$axios.get('./api/rolelist')
       .then(res => {
         this.rolelist = res.data.list
       })
     },

    // 编辑按钮
    edit(id){
      this.$router.push('/role/' + id)
    },
    // 删除按钮
    deleRole(id){
     let c = confirm('你确定删除吗？')
      if(c){
        this.$axios.post('/api/roledelete',{id:id })
          .then(res => {
            if(res.data.code === 200){
              this.rolelist = res.data.list
            }
        }).catch(err => console.log(err))
      }
    }
  }
};
</script>

<style>
</style>