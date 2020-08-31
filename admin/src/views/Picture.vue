<template>
    <div>
<div class="upload">
   <el-upload
  action="http://192.168.3.6:8081/upload/img"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div>
        
    </div>
</template>
<script>
  export default {
    data() {
      return {
         dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
       handleRemove(file, fileList) {
           debugger
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
          debugger
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>