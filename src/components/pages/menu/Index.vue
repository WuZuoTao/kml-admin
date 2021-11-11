<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
</el-breadcrumb>
  <el-button type="primary" style="margin-top:10px;margin-bottom:10px" @click="$router.push('/menu/add')">添加</el-button>
    <el-table :data="menulist" border style="width: 100%" :tree-props="{children:'children'}" row-key="id">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="名称" width="180"> </el-table-column>
      <el-table-column prop="icon" label="图标"> </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
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
import {mapActions} from 'vuex'
export default {
  name: "v-menu",
  data() {
    return {
      dialogVisible: false,
      menulist: [],
      delId:''
    };
  },
  mounted() {
    this.getMenuList({istree:1}).then(res => {
      this.menulist = res.data.list
    }).catch(err => console.log(err));
  },
  methods: {
    // 异步请求，渲染DOM
      ...mapActions(['getMenuList']),
      // getMenuList() {
      // 通过vuex调用action来请求数据
      // this.$axios
      //   .get("/api/menulist",{params:{istree:1}})
      //   .then((result) => {
      //     this.menulist = result.data.list;
      //   })
      //   .catch((err) => err);
      //},
    // 编辑按钮
    edit(id){
      this.$router.push('/menu/' + id)
    },
    // 删除按钮
    deleTMenu(){
      this.dialogVisible = false
      this.$axios.post('/api/menudelete',{id:this.delId })
      .then(res => {
        if(res.data.code === 200){
          this.menulist = res.data.list
        }
      }).catch(err => console.log(err))
    }
  }
};
</script>

<style>
</style>