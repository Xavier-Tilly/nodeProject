<template>
  <div class="app">
    <el-row :gutter="21">
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
          <span>实名制登记</span>
          <span>{{smzdj}}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
           <span>在职人数</span>
          <span>{{zzrs}}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
           <span>在岗人数</span>
          <span>{{zgrs}}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
           <span>违规预警</span>
          <span>{{wgyj}}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
           <span>考勤异常</span>
          <span>{{kqyc}}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
           <span>设备异常</span>
          <span>{{sbyc}}</span>
        </div>
      </el-col>
    </el-row>
    <ve-line height="80%" :data="chartData" :settings="chartSetings"></ve-line>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSetings = {
      labelMap: {
        name: "姓名",
        age: "年龄",
      },
      legendName: {
        age: "年龄",
      },
      yAxisName: ["年龄"],
    };
    return {
      chartData: {
        columns: ["name", "age"],
        rows: [],
      },
      smzdj: "",
      zzrs: "",
      zgrs: "",
      wgyj: "",
      kqyc: "",
      sbyc: "",
    };
  },
  created() {
    this.getList();
    this.getBaseInfo();
  },
  methods: {
    getList() {
      this.$http({
        url: "/chartsList",
        method: "get",
      }).then((res) => {
        this.chartData.rows = res.data.data;
      });
    },
    getBaseInfo() {
      this.$http({
        url: "/baseInfo",
        type: "get",
      })
        .then((res) => {
          this.smzdj = res.data.data.smzdj;
          this.zzrs = res.data.data.zzrs;
           this.zgrs = res.data.data.zgrs;
          this.wgyj = res.data.data.wgyj;
          this.kqyc = res.data.data.kqyc;
          this.sbyc = res.data.data.sbyc;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  height: 100%;
  width: 100%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 66px;
  text-align: center;
  line-height: 66px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>