const express = require('express');
const app = express()
const mysql = require("mysql");
const bodyParser = require('body-parser'); //当客户端的请求为post请求时需要通过它去解析客户端传过来的数据

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); //中间层对post请求的req进行解析

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

app.listen(3000, () => {
    console.log("服务器开启在3000端口。。。");
})
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '88888',
    database: 'user_list',
    multipleStatements: true // 支持执行多条 sql 语句
})
db.connect((err) => {
    if (err) throw err;
    console.log('连接成功')
})
app.post('/addUser', (req, res) => { //用户新增
    console.log(req.body)
    let data = req.body;
    let sql = `insert into login_list(id,name,sex,age) values("${data.id}","${data.name}","${data.sex}","${data.age}");
    select * from login_list where id="${data.id}"`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(data.id)
            if(data.id!=""&&data.id!=undefined){
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
           
        }else{
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
    let sql = `select id,name,sex,age,DATE_FORMAT(time,'%Y-%c-%d %h:%i:%s') as date from login_list limit ${pageNum},${pageSize};select count(0) as count from login_list`
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
app.post('/updateList', (req, res) => {//修改接口
    console.log(req.body)
    let data = req.body;
    let sql = `update login_list set name="${data.name}",sex="${data.sex}",age="${data.age}" where id="${data.id}"`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data);
            res.json({
                code: 200,
                msg: '修改成功！',
                id:data.id
            })
        }
    })
})
app.delete("/deleteUser",(req,res)=>{//删除
    console.log(req.body)
    let data=req.body
    let sql=`delete from login_list where id="${data.id}" `
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.json({
                code:200,
                msg:'删除成功',
                id:data.id
            })
        }
    })
})
app.post('/searchUser',(req,res)=>{
    console.log(req);
    let data=req.body;
    let sql=`select * from login_list where name like "%${data.name}%"`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                data:result,
                code:200,
            })
        }
    })
})