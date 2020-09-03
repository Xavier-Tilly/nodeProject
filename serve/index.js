const express = require('express');
const app = express()
const mysql = require("mysql");
const multer=require('multer');
const bodyParser = require('body-parser'); //当客户端的请求为post请求时需要通过它去解析客户端传过来的数据
const route=require('./routes/admin/index')
const route2=require('./routes/uploadImage/index')
const charts=require('./routes/echarts/index')
const login=require('./routes/login/index')
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

const db = mysql.createPool({//创建连接池连接数据库
    // host: '49.235.105.91',
    // //这个是数据库端口
    // port: '3306',
    // user: 'login',
    // password: 'mmEkLA8d8kpDXfDA',
    // database: 'login',
    // connectionLimit: 5, //
    // multipleStatements: true // 支持执行多条 sql 语句
    host: 'localhost',
    user: 'root',
    password: '88888',
    database: 'login',
    connectionLimit: 5, //s
    multipleStatements: true // 支持执行多条 sql 语句
});
route(app,db)
route2(app,db,upload)
charts(app,db)
login(app,db)
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
