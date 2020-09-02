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
}
module.exports=route;