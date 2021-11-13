<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button 
        type="primary" 
        style="margin-top:10px;margin-bottom:10px" 
        @click="$router.push('/goods/add')"
    >添加</el-button>
    <el-table 
        :data="goodslist" 
        border 
        style="width: 100%"
    >
        <el-table-column prop="id" label="编号" width="180" />
        <el-table-column prop="goodsname" label="名称" width="180" />
        <el-table-column prop="price" label="价格" width="120" />
        <el-table-column prop="market_price" label="市场价格" width="120" /> 
        <el-table-column prop="img" label="图片" width="120px"> 
          <template slot-scope="scope">
              <img class="cateimg" :src="scope.row.img" alt="" >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否热卖" width="120">
            <template slot-scope="scope">
            <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
                {{ scope.row.status == "1" ? "热卖" : "否" }}
            </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="是否新品"  width="120">
            <template slot-scope="scope">
                <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
                    {{ scope.row.status == "1" ? "新品" : "否" }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"  width="120">
            <template slot-scope="scope">
            <el-tag :type="scope.row.status == '1' ? 'primary' : 'danger'">
                {{ scope.row.status == "1" ? "启用" : "禁用" }}
            </el-tag>
            </template>
        </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="deletegoods(scope.row.id)">删除</el-button>
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
      goodslist: [],
      delId:''
    };
  },
  mounted() {
      this.getGoodsList()
  },
  methods: {
    // 编辑按钮
    edit(id){
      this.$router.push('/goods/' + id)
    },
    getGoodsList(){
        this.$axios.get('/api/goodslist')
        .then(res => {
            this.goodslist = res.data.list
        }).catch(err => {
            console.log(err)
        })
    },
     // 删除按钮
    deletegoods(id){
     let c = confirm('你确定删除吗？')
      if(c){
        this.$axios.post('/api/goodsdelete',{id:id })
          .then(res => {
            if(res.data.code === 200){
              this.goodslist = res.data.list
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