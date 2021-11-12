<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
</el-breadcrumb>
  <el-button type="primary" style="margin-top:10px;margin-bottom:10px" @click="$router.push('/admin/add')">添加</el-button>
    <el-table :data="userlist" border style="width: 100%" row-key="id">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="username" label="名称" width="180"> </el-table-column>
       <el-table-column prop="rolename" label="角色" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
            {{ scope.row.status == "1" ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="dialogVisible = true;delId=scope.row.id">删除</el-button>
        </template>
         </el-table-column>
    </el-table>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>确定删除吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleTMenu">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      dialogVisible: false,
      userlist: [],
      delId:''
    };
  },
  mounted() {
   this.getuserList()
  },

  methods: {
     getuserList(){
       this.$axios.get('./api/userlist',{params:{
         size:10,
         page:1
       }})
       .then(res => {
         this.userlist = res.data.list
       })
     },

    // 编辑按钮
    edit(uid){
      this.$router.push('/admin/' + uid)
    },

    // 删除按钮
    deleTMenu(){
      this.dialogVisible = false
      this.$axios.post('/api/userdelete',{id:this.delId })
      .then(res => {
        if(res.data.code === 200){
          this.userlist = res.data.list
        }
      }).catch(err => console.log(err))
    }
  }
};
</script>

<style>
</style>