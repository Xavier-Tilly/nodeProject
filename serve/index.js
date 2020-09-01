const express = require('express');
const app = express()
const mysql = require("mysql");
const multer=require('multer');
const bodyParser = require('body-parser'); //当客户端的请求为post请求时需要通过它去解析客户端传过来的数据

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'D:/images/')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
var upload=multer({storage:storage});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); //中间层对post请求的req进行解析
app.use(express.static('public'));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //   http://www.yueyanshaosun.cn,http://www.baidu.com,www,...
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    // if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    // else next();
    next();
});

//这个是服务端口
app.listen(8081, () => {
    console.log("服务器开启在8081端口。。。");
})
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '88888',
//     database: 'login',
//     multipleStatements: true // 支持执行多条 sql 语句
// })
//你这个服务端口是多少
// db.connect((err) => {
//     if (err) throw err;
//     console.log('连接成功')
// })
//创建连接池
const db = mysql.createPool({
    host: '49.235.105.91',
    //这个是数据库端口
    port: '3306',
    user: 'login',
    password: 'mmEkLA8d8kpDXfDA',
    database: 'login',
    connectionLimit: 5, //
    multipleStatements: true // 支持执行多条 sql 语句
    // host: 'localhost',
    // user: 'root',
    // password: '88888',
    // database: 'login',
    // connectionLimit: 5, //s
    // multipleStatements: true // 支持执行多条 sql 语句
});
db.getConnection((err, conn) => {
    if (err) {
        console.log('mysql数据库连接失败');
    } else {
        console.log('数据库连接成功(连接池)');
        let sql = `select * from user_list`;
        conn.query(sql, (err2, res) => {
            if (err2) {
                console.log('查询数据库失败')
            } else {
                conn.release();
            }
        })
    }
})
app.post('/upload/img',upload.array('images',2),function(req,res){
   //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹
   let url='http://localhost:7221/';
   var data =req.files 
   let sql=`insert into images_list(url,name) values('${url}${data[0].filename}','${data[0].originalname}');select * from images_list`
   db.query(sql,(err,result)=>{
       if(err){
        return res.json({
            code: 1,
            msg: "上传失败"
        })
       }else{
        res.json({
            url:  `${url}${data[0].filename}`,
            data:data[0],
            code:200,
            msg:'上传成功',
            imgList:result[1]
         })
       }
   })
})
app.post('/picture/list',(req,res)=>{//获取图片列表
    let sql='select * from images_list';
    db.query(sql,(err,result)=>{
        if(err){
            return res.json({
                code:1,
                msg:'获取列表失败'
            })
        }else{
            res.json({
                code:200,
                data:result,
                msg:'成功'
            })
        }
    })
})
app.delete('/delete/imgList',(req,res)=>{
    let data=req.body;
    console.log(data)
    let sql=`delete from images_list where id=${data.id}`;
    db.query(sql,(err,result)=>{
        if(err){
            res.json({
                code:1,
                msg:'删除失败'
            })
        }else{
            res.json({
                code:200,
                msg:'删除成功'
            })
        }
    })
})
app.post('/addUser', (req, res) => { //用户新增
    let data = req.body;
    let sql = `insert into user_list(id,name,sex,age) values("${data.id}","${data.name}","${data.sex}","${data.age}");
    select * from user_list where id="${data.id}"`;
    db.query(sql, (err, results) => {
        if (err) {
            if (data.id != "" && data.id != undefined) {
                return res.json({
                    code: 1,
                    msg: "已存在的编号"
                })
            }
            // if(data.id==undefined){//后端控制必填
            //     return res.json({
            //         code: 1,
            //         msg: '编号不能为空'
            //     })
            // }

        } else {
            res.json({
                code: 200,
                msg: '添加成功'
            })
        }

    })
})

app.post("/userList", (req, res) => { //查询列表
    console.log(req.body)
    let data = req.body;
    let pageNum = (data.pageNum - 1) * data.pageSize;
    let pageSize = data.pageSize;
    let sql = `select id,name,sex,age,DATE_FORMAT(time,'%Y-%c-%d %h:%i:%s') as date from user_list limit ${pageNum},${pageSize};select count(0) as count from user_list`
    // let sqlLimit="";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result[1]);
            let data = result[0];
            let count = result[1][0].count;
            res.json({
                code: 200,
                msg: '成功',
                data: data,
                count: count
            });
        }
    })
})
app.post('/updateList', (req, res) => { //修改接口
    console.log(req.body)
    let data = req.body;
    let sql = `update user_list set name="${data.name}",sex="${data.sex}",age="${data.age}" where id="${data.id}"`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data);
            res.json({
                code: 200,
                msg: '修改成功！',
                id: data.id
            })
        }
    })
})
app.delete("/deleteUser", (req, res) => { //删除
    console.log(req.body)
    let data = req.body
    let sql = `delete from user_list where id="${data.id}" `
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.json({
                code: 200,
                msg: '删除成功',
                id: data.id
            })
        }
    })
})
app.post('/searchUser', (req, res) => {
    console.log(req);
    let data = req.body;
    let sql = `select * from user_list where name like "%${data.name}%"`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                data: result,
                code: 200,
            })
        }
    })
})
app.get('/chartsList', (req, res) => {
    let sql = `select name,age from user_list limit 10`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                data: data,
                code: 200
            })
        }
    })
})