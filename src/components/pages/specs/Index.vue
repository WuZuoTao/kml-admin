<template>
  <div class="menu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="primary"
      style="margin-top: 10px; margin-bottom: 10px"
      @click="$router.push('/specs/add')"
      >添加</el-button
    >
    <el-table
      :data="specslist"
      border
      style="width: 100%"
      :tree-props="{ children: 'children' }"
      row-key="id"
    >
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="specsname" label="规格" width="180">
      </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="item in scope.row.attrs" :key="item">{{
              item
            }}</el-tag>
          </div>
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
          <el-button type="danger" @click="deleteSpecs(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "specs",
  data() {
    return {
      dialogVisible: false,
      specslist: [],
      delId: "",
    };
  },
  mounted() {
    this.getSpecsList();
  },
  methods: {
    // 异步请求，渲染DOM
    getSpecsList() {
      this.$axios
        .get("/api/specslist")
        .then((result) => {
          this.specslist = result.data.list;
          console.log(result);
        })
        .catch((err) => err);
    },
    // 编辑按钮
    edit(id) {
      this.$router.push("/specs/" + id);
    },

    // 删除按钮
    deleteSpecs(id) {
      let c = confirm("你确定删除吗？");
      if (c) {
        this.$axios
          .post("/api/specsdelete", { id: id })
          .then((res) => {
            if (res.data.code === 200) {
              this.specslist = res.data.list;
            }
          }).catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style>
</style>