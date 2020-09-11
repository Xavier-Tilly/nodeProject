function route(app, db, upload) {

    app.post('/addUser', (req, res) => { //用户新增
        let data = req.body;
        let sql = `insert into user_list(name,sex,age,img) values("${data.name}","${data.sex}","${data.age}",'http://localhost:7221/1599028701520-微信图片_20200604120935.png');
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
        let sql = `select id,name,sex,age,DATE_FORMAT(time,'%Y-%c-%d %h:%i:%s') as date,img from user_list limit ${pageNum},${pageSize};select count(0) as count from user_list;`
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
               
                res.json({
                    code: 200,
                    msg: '删除成功',
                    id: data.id
                })
            }
        })
    })
    app.delete('/deleteBatch', (req, res) => { //批量删除
        let ids=req.body.ids.join(',')
        console.log(ids)
        let sql=`delete from user_list where id in (${ids})`
        db.query(sql,(err,result)=>{
            if(err){
                res.json({
                    code:1,
                    msg:'批量删除失败'
                })
            }else{
                res.json({
                    code: 200,
                    msg: '批量删除成功',
                })
            }
        })
    })
    app.post('/searchUser', (req, res) => { //姓名搜索
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


}
module.exports = route;