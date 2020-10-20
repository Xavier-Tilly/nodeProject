// App.vue
<template>
  <div id="app">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://192.168.3.6:8082/uploadExcelFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="successFile"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
    <el-table :data="tableData" height="750" border style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="education" label="学历"> </el-table-column>
      <el-table-column prop="marital" label="婚姻状况"> </el-table-column>
    </el-table>
    <div class="block" style="text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      file: "",
      tableData: [],
      pageNum: 1,
      pageSize: 20,
      count: 0,
      fileList: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    successFile(err, file, fileList) {
      if (file.response.code !== 200) {
        this.$message({
          message: `${file.response.msg}`,
          type: "error",
        });
      } else {
        this.$message({
          message: `上传成功`,
          type: "success",
        });
        this.getData();
      }
    },
    getData() {
      this.$http({
        url: "/user2List",
        method: "post",
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.tableData = res.data.data;
        this.count = res.data.count;
      });
    },
    handleSizeChange(val) {
      //切换条数
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      //改变页码
      this.pageNum = val;
      this.getData();
    },
  },
};
</script>

<style lang="scss">
.progress-wrap {
  width: 300px;
  p {
    width: 100%;
  }
  .progress {
    background-color: #c5c8ce;
    height: 20px;
    span {
      display: block;
      background-color: #19be6b;
      height: 100%;
      width: 0;
    }
  }
}
</style>
