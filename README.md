### 项目名称 ###
nodeProject
### 克隆项目 ###
git clone https://github.com/Xavier-Tilly/nodeProject.git
### 进入项目目录 ###
cd nodeProject
### 初始化安装依赖 ###
安装淘宝镜像npm install --registry=https://registry.npm.taobao.org
cnpm install//初始化
### 启动服务//运行项目 ###
 npm run serve 
### 项目介绍 ### 
心血来潮简单的使用node做了个项目，练习一下用node写了个增、删、改、查，及图片上传接口非常适合小白学习
### 后端技术选型 ###
后端使用node+express+mysql+nginx(由于没有阿里云的oss，所以使用了nginx代理图片路径)
项目包含四大模块，用户新增、用户列表、图片上传、数据分析。
### 前端技术选型 ###
前端使用vue+element。按需引入v-chart的折线图
使用vue-cli3.x脚手架安装后台管理项目框架，使用element-ui搭建后台
