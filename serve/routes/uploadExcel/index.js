function route(app, db, upload, xlsx) {
    // 上传excel
    app.route("/uploadExcelFile")
        .post(upload.any(), (req, res) => {
            if (!req.files || req.files.length === 0) {
                return res.json({
                    text: '请选择文件上传'
                })
            }
            const {
                originalname,
                buffer
            } = req.files[0]
            if (!originalname.endsWith('xls') && !originalname.endsWith('xlsx')) {
                return res.json({
                    code: '1',
                    msg: '请上传xls或xlsx格式的文件'
                })
            }

            // 解析excel文件
            const workbook = xlsx.read(buffer, {
                type: "buffer"
            })
            const sheet2JSONOpts = {
                /** Default value for null/undefined values */
                defval: '' //给defval赋值为空的字符串
            }
            const sheet = workbook.Sheets[workbook.SheetNames[0]] // 选择第一个工作簿
            const result = xlsx.utils.sheet_to_json(sheet, sheet2JSONOpts)
            // //判断上传的文件是否存在数据库
           
            // let filesql = `select filename from filename_list where filename='${originalname}'`
            // db.query(filesql, (err, datas) => {
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         console.log(originalname)
            //         // console.log('wenjain,'+datas[0].filename)
            //         // if(datas[0].filename==originalname){
            //            return  res.json({
            //                 code:1,
            //                 msg:'文件重复上传',
            //                 datas:datas
            //             })
            //         // }
            //     }
            // })
            for (let i = 0; i < result.length; i++) {
                let sql = `INSERT INTO user2_list ( name,age,sex,education,marital) VALUES('${result[i].姓名}', 
                    '${result[i].年龄}', '${result[i].性别}', '${result[i].学历}','${result[i].婚姻状况}')`
                db.query(sql, (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
            let sql2 = `insert into filename_list (filename) values ('${originalname}')`
            db.query(sql2, (err, data) => {
                if (err) {
                    console.log(err)
                }
            })
            return res.json({
                result: result,
                filename: originalname,
                code: 200,
            })
        })

    app.post("/user2List", (req, res) => { //查询列表
        let data = req.body;
        let pageNum = (data.pageNum - 1) * data.pageSize;
        let pageSize = data.pageSize;
        let sql = `select name,age,sex,education,marital from user2_list limit ${pageNum},${pageSize};select count(0) as count from user2_list`
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
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


}
module.exports = route;