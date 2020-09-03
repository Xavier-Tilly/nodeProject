function route(app, db) {
    app.post('/login', (req, res) => {
        var userName = req.body.username;
        var pwd = req.body.password;
        console.log(userName)
        console.log(pwd)
        if (!userName) {
            res.json({
                code: 1,
                msg: '用户名不能为空'
            })
        } else if (!pwd) {
            res.json({
                code: 1,
                msg: '用密码不能为空'
            })
        } else {
            let sql = `select username,password from login_list`
            db.query(sql, (err, result) => {
                var isTrue = false;
                if (err) {
                    res.json({
                        code: 200,
                        msg: '账号或密码错误',
                    })
                } else {

                    for (let i = 0, len = result.length; i < len; i++) {
                        if (result[i].username == userName && result[i].password == pwd) {
                            isTrue = true;
                        }
                    }
                    if (isTrue) {
                        res.json({
                            code: 200,
                            msg: '验证成功'
                        })
                    } else {
                        res.json({
                            code: 1,
                            msg: '账号或密码错误',
                        })
                    }
                }

            })
        }

    })
}
module.exports = route;