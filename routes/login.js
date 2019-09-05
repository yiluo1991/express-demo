var router=require('express').Router();
var db=require('../db');

/**
 * 
 * @api {Post} /login 登录
 * @apiName login
 * @apiGroup login
 * @apiVersion 1.0.0
 * 
 * 
 * @apiParam  {String} loginname 用户名
 * @apiParam  {String} password 密码
 * 
 * @apiSuccess (请求成功状态：200) {Boolean} success 登录是否成功
 * @apiSuccess (请求成功状态：200) {String}  message 提示信息
 * 
 * @apiSuccess (登录成功设置Cookie) {Set-Cookie}  node_auth 签名过的用户名信息
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success": false,
 *     "message": "用户名或密码有误"
 * }
 * 
 * 
 */

router.post('/',function(req,res){
    var loginname=req.body.loginname;
    var password=req.body.password;
    if(loginname!=undefined&&password!=undefined){
        //验证用户名密码 
        db.query(
            'select * from tb_admin where loginname=? and `password`=md5(?)',
            [loginname,loginname+password],
            function(err,result){
                if(err){
                    res.send({
                        success:false,
                        message:"数据访问异常"
                    })
                }else{
                    if(result.length>0){
                        //大于0，说明有查到记录，登录成功
                        res.cookie("node_auth",loginname,{
                            signed:true
                        });
                        res.send({
                            success:true,
                            message:"登录成功"
                        })
                    }else{
                        res.send({
                            success:false,
                            message:"用户名或密码有误"
                        })
                    }
                }
            }
        )
    }else{
        res.send({
            success:false,
            message:"用户或密码格式不正确"
        })
    }
})

module.exports=router;