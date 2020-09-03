<template>
  <div>
    <h1>分类列表</h1>
    <el-button
      type="primary"
      style="margin-right:20px"
      class="el-icon-delete"
      @click="deleteAll(tableChecked)"
    >批量删除</el-button>
    <el-input style="width:200px;margin:0 20px 20px 0" v-model="inputVal" placeholder="输姓名进行搜索"></el-input>
    <el-button type="primary" @click="getSearch" icon="el-icon-search">搜索</el-button>
    <el-table
      @selection-change="handleSelect"
      highlight-current-row
      :data="list"
      border
      height="700"
      style="width:100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column sortable prop="id" label="编号" width="140"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column sortable prop="age" label="年龄"></el-table-column>
      <el-table-column sortable prop="date" label="时间"></el-table-column>
      <el-table-column prop="img" label="头像" width="180">
        <!--插入图片链接的代码-->
        <template slot-scope="scope">
          <img :src="scope.row.img" alt style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <div class="operator">
            <el-button
              @click="handleClick(scope.row)"
              class="el-icon-view"
              type="text"
              size="small"
            ></el-button>
            <el-button
              @click="handleClickUpdate(scope.row)"
              class="el-icon-edit"
              type="text"
              size="small"
            ></el-button>
            <el-button
              @click="handleClickDelete(scope.row.id)"
              class="el-icon-delete"
              type="text"
              size="small"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>

    <el-dialog title="详情" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <div class="dialog1">
        <p>
          <span>编号：{{id}}</span>
          <span>姓名：{{name}}</span>
        </p>
        <p>
          <span>性别：{{sex}}</span>
          <span>年龄：{{age}}</span>
        </p>
        <p>注册时间：{{time}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
      <div class="dialog2">
        <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="编号">
            <el-input v-model="model.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="model.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <template>
              <el-radio-group v-model="model.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除" :visible.sync="dialogVisible3" width="30%" :before-close="handleClose3">
      <div class="dialog3">
        <p>
          确定删除编号为
          <span style="color:#f00;font-size:20px;font-weight:800">{{id}}</span>的用户数据吗
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      ids: [],
      tableChecked: [], //被选中的数据
      inputVal: "",
      model: {
        name: "",
        sex: "",
        age: "",
      },
      count: 0,
      pageNum: 1,
      pageSize: 10,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      id: "",
      name: "",
      sex: "",
      age: "",
      time: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // handleRadio(value) {
    //     this.model.sex = value;
    //     let s=this.radio
    // },
    handleClose(done) {
      //查看弹出框
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleClose2(done) {
      //修改弹出框
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleClose3(done) {
      //修改弹出框
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    dialogUpdate() {
      //确认修改
      this.$http({
        url: "/updateList",
        method: "post",
        data: {
          id: this.model.id,
          name: this.model.name,
          sex: this.model.sex,
          age: this.model.age,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          //  this.$message(res.data.msg)
          this.$message({
            message: `编号为${res.data.id}的数据${res.data.msg}`,
            type: "success",
          });
          this.dialogVisible2 = false;
          this.getList();
        }
      });
    },
    handleClick(row) {
      //详情
      this.id = row.id;
      this.name = row.name;
      this.sex = row.sex;
      this.age = row.age;
      this.time = row.date;
      this.dialogVisible1 = true;
    },
    handleClickUpdate(row) {
      //修改
      debugger
      this.model.id = row.id;
      this.model.name = row.name;
      this.model.sex = row.sex;
      this.model.age = row.age;
      this.model.time = row.date;
      this.dialogVisible2 = true;
    },
    handleClickDelete(id) {
      //删除
      this.id = id;
      this.dialogVisible3 = true;
    },
    dialogDelete() {
      //删除接口
      this.$http({
        url: "deleteUser",
        method: "delete",
        data: {
          id: this.id,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: `编号为${res.data.id}的用户删除成功`,
            type: "success",
          });
          this.dialogVisible3 = false;
          this.getList();
        }
      });
    },
    getList() {
      this.$http({
        method: "post",
        url: "/userList",
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.list = res.data.data;
        this.count = res.data.count;
      });
    },
    handleSizeChange(val) {
      //切换条数
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      //改变页码
      this.pageNum = val;
      this.getList();
    },
    getSearch() {
      this.$http({
        url: "/searchUser",
        method: "post",
        data: {
          name: this.inputVal,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length == 0) {
            this.$message({
              message: `姓名为${this.inputVal}的用户不存在`,
              type: "warning",
            });
          } else {
            this.list = res.data.data;
          }
        }
      });
    },
    handleSelect(val) {
      this.tableChecked = val;
    },

    deleteAll(row) {
      if (row.length == 0) {
        this.$message({
          message: `请先选中想要删除的数据`,
          type: "warning",
        });
        return false;
      }
      row.forEach((item) => {
        this.ids.push(item.id);
      });
      this.$http({
        url: "/deleteBatch",
        method: "delete",
        data: {
          ids: this.ids,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: `${res.data.msg}`,
            type: "success",
          });
          this.getList();
        } else {
          this.$message({
            message: `${res.data.msg}`,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog1 {
  p {
    display: flex;
    justify-content: space-between;
    margin: 20px;
  }
  p:nth-of-type(3) {
    display: block;
  }
}
.operator {
  display: flex;
  justify-content: space-around;
  button {
    font-size: 18px;
  }
  button:nth-of-type(3) {
    color: #f00;
  }
}
</style>