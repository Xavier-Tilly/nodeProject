function route(app,db){
    app.get('/chartsList', (req, res) => {//图表
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
    app.get('/baseInfo',(req,res)=>{
        let sql=`select * from base_info`;
        db.query(sql,(err,data)=>{
            if(err){
                res.json({
                    code:1,
                    data:err
                })
                console.log(err)
            }else{
                console.log(data[0])
                res.json({
                    data:data[0],
                    code:200
                })
            }
        })
    })
}
module.exports=route;