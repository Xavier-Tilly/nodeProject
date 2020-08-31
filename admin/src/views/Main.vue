<template>
<el-container style="height: 100vh">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <el-menu-item @click="toPage" index="1-1">新建分类</el-menu-item>
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
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>管理员</span>
    </el-header>
    
    <el-main>
        <router-view></router-view>
     
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
     return{}
    },
    methods:{
        toPage(){
            this.$router.push('/categoryEdit')
        },
        toCategoryList(){
            this.$router.push('/categoryList')
        },
        toCharts(){
          this.$router.push('/charts')
        },
        toPicture(){
          this.$router.push('/picture')
        }
    }
  };
</script>