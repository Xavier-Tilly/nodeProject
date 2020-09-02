<template>
  <div class="app">
    <ve-line  height='100%' :data="chartData" :settings="chartSetings"></ve-line>
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
    };
  },
  created() {
    this.getList();
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
  },
};
</script>
<style lang="scss" scoped>
.app{
  height: 100%;
  width: 100%;
}
</style>