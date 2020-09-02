function route(app,db,upload){
    app.post('/upload/img',upload.array('images',2),function(req,res){
        //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹
        let url='http://localhost:7221/';
        var data =req.files 
        let sql=`insert into images_list(url,name) values('${url}${data[0].filename}','${data[0].originalname}')`
        db.query(sql,(err,result)=>{
            if(err){
             return res.json({
                 code: 1,
                 msg: "上传失败"
             })
            }else{
                let obj={
                    url:`${url}${data[0].filename}`,
                    name:`${data[0].filename}`,
                    id:result.insertId
                }
             res.json({
                 // url:  `${url}${data[0].filename}`,
                 // data:data[0],
                 code:200,
                 msg:'上传成功',
                  imgList:obj
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
     app.delete('/delete/imgList',(req,res)=>{//删除图片
         let data=req.body;
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
}
module.exports=route;