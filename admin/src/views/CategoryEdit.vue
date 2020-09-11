<template>
  <div>
    <h1>新建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="编号">
        <el-input v-model="model.id"></el-input>
      </el-form-item> -->
      <el-form-item label="姓名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="model.age"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <template>
          <el-radio-group v-model="radio" @change="handleRadio">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      radio: "",
    };
  },

  methods: {
    handleRadio(value) {
      this.model.sex=value
    },
    save() {
      // if (this.model.id == "" || this.model.id == undefined) {
      //   this.$message({
      //     message: "编号不能为空",
      //     type: "error",
      //   });
      //   return false;
      // }
      if (this.model.age) {
        
        if (Number(this.model.age).toString() == "NaN") {
          this.$message({
            message: "请输入数字",
            type: "error",
          });
          return false;
        }
      } else {
        this.$message({
          message: "年龄不能为空",
          type: "error",
        });
        return false;
      }
      this.$http({
        method: "post",
        url: "/addUser",
        data: {
          id: this.model.id,
          name: this.model.name,
          sex: this.model.sex,
          age: this.model.age,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>