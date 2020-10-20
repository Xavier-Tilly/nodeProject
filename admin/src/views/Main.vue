<template>
  <el-container style="height: 100vh">
    <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <el-menu-item @click="toPage" index="1-1">新建分类</el-menu-item>
        </el-menu-item-group>
            <el-menu-item-group>
          <el-menu-item @click='toCategoryList' idnex="1-2">分类列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>数据可视化</template>
        <el-menu-item-group>
          <el-menu-item @click="toCharts" index="2-1">年龄图</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item @click="toPicture" index="2-2">图库</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item @click="toUpload" index="2-3">文件上传</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside> -->

    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="toPage" index="1-1">新建分类</el-menu-item>
          <el-menu-item @click="toCategoryList" index="1-2"
            >分类列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">数据可视</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="toCharts" index="2-1">年龄图</el-menu-item>
          <el-menu-item @click="toCategoryList" index="2-2">图库</el-menu-item>
          <el-menu-item @click="toUpload" index="2-3">文件上传</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="1"
            ><div class="grid-content bg-purple">
              <i
                :class="fold"
                @click="funFold"
                style="font-size: 24px"
              ></i></div
          ></el-col>
          <el-col :span="1"
            ><div class="grid-content bg-purple">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>管理员</span>
            </div></el-col
          >
        </el-row>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.row-bg {
  align-items: center;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      fold: "el-icon-s-fold",
    };
  },
  methods: {
    funFold() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.fold = "el-icon-s-unfold";
      } else {
        this.fold = "el-icon-s-fold";
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toPage() {
      this.$router.push("/categoryEdit");
    },
    toCategoryList() {
      this.$router.push("/categoryList");
    },
    toCharts() {
      this.$router.push("/charts");
    },
    toPicture() {
      this.$router.push("/picture");
    },
    toUpload() {
      this.$router.push("/uploadExcel");
    },
  },
};
</script>