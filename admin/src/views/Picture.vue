<template>
  <div>
    <div class="upload">
      <el-upload
        action="http://192.168.3.6:8081/upload/img"
        list-type="picture-card"
        name="images"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="successFun"
        :file-list="imgList"
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgList: [],
      // url: "http://localhost:7221/",
    };
  },
  created() {
    this.getImgList();
  },
  methods: {
    handleRemove(file, fileList) {
      debugger;
      let id = "";
      if (file.response) {
        id = file.response.imgList.id;
      } else {
        id = file.id;
      }
      this.$http({
        url: "/delete/imgList",
        method: "delete",
        data: {
          id: id,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: `${res.data.msg}`,
            type: "success",
          });
        } else {
          this.$message({
            message: `${res.data.msg}`,
            type: "error",
          });
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    successFun(res, file, fileList) {
      if (res.code == 200) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        if (res.imgList.length == 1) {
          this.imgList.push(res.imgList);
        } else {
          for (let i = 0, len = res.imgList.length; i < len; i++) {
            this.imgList[i].push(res.imgList[i]);
          }
        }
      } else {
        this.$message({
          message: "上传失败",
          type: "error",
        });
      }
    },
    getImgList() {
      this.$http({
        url: "/picture/list",
        method: "post",
      }).then((res) => {
        this.imgList = res.data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.img_list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  p {
    margin-right: 10px;
  }
  img {
    width: 200px;
    height: 150px;
  }
}
</style>