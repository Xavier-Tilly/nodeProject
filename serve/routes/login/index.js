const jwt = require('jsonwebtoken')

function route(app, db) {
    app.post('/login', (req, res) => {
        var userName = req.body.username;
        var pwd = req.body.password;
        // const token = String(req.headers.authorization || '').split(' ').pop();
        // console.log('token,'+req.headers.authorization)
        // const tokenData = jwt.verify(token, app.get('secret'))
        // console.log(tokenData)
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

            let sql = `select username from login_list where username='${userName}';select password from login_list where username='${userName}'`
            db.query(sql, (err, result) => {
                if (err) {
                    res.json({
                        code: 1,
                        msg: '用户名或密码错误',
                    })
                } else {
               res.json({
                   code:200,
                   msg:'登录成功'
               })
                }

            })
        }

    })
}
module.exports = route;