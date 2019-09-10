var router = require("express").Router();
var db = require("../db");


/**
 * 
 * @api {get} /admin/get 获取管理账号列表
 * @apiName get
 * @apiGroup admin
 * @apiVersion  1.0.0
 * @apiPermission 登录用户
 * 
 * @apiParam  {String} [keyword] 关键字
 * 
 * 
 */
router.get('/get', function (req, res) {
    var keyword = req.query.keyword || "";
    db.query('select Id,LoginName from tb_admin', function (err, result) {
        if (err) {
            res.send({
                success: false,
                message: "查询失败"
            })
        } else {
            res.send({
                success: true,
                message: "查询成功",
                rows: result
            })
        }
    })
})


/**
 * 
 * @api {POST} /admin/delete 删除管理账号
 * @apiName delete
 * @apiGroup admin
 * @apiVersion  1.0.0
 * @apiPermission 登录用户
 * @apiParam  {Integer} id Id
 * 
 * @apiSuccess (请求成功状态：200) {Boolean} success 请求是否成功
 * @apiSuccess (请求成功状态：200) {String}  message 提示信息
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success": true,
 *     "message": "删除成功"
 * }
 * 
 * 
 */
router.post('/delete', function (req, res) {
    if (req.body.id) {
        db.query('select * from tb_admin where loginname=?', [req.signedCookies.node_auth], function (err, result) {
            if (result[0].Id == req.body.id) {
                res.send({
                    message: "不可以删除当前登录账号",
                    success: false
                })
            } else {
                db.query('delete from tb_admin where id=?', [req.body.id], function (err, result) {
                    if (result.affectedRows > 0) {
                        //受影响行数>0
                        res.send({
                            success: true,
                            message: "删除成功"
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "找不到要删除的数据"
                        })
                    }
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "id参数有误"
        })
    }
})

/**
 * 
 * @api {POST} /admin/reset 重置密码为123456
 * @apiName reset
 * @apiGroup admin
 * @apiVersion  1.0.0
 * @apiPermission 登录用户
 * @apiParam  {Integer} id Id
 * 
 * @apiSuccess (请求成功状态：200) {Boolean} success 请求是否成功
 * @apiSuccess (请求成功状态：200) {String}  message 提示信息
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success": true,
 *     "message": "重置成功"
 * }
 * 
 * 
 */
router.post('/reset', function (req, res) {
    if (req.body.id) {
        db.query('select * from tb_admin where id=?', [req.body.id], function (err, result) {
            if (result.length > 0) { 
                db.query('update  tb_admin set password=md5(?) where id=?', [result[0].LoginName + "123456", req.body.id], function (err, result) {
                    res.send({
                        success: true,
                        message: "重置成功"
                    })
                })
            } else {
                res.send({
                    message: "找不到要重置密码的账号",
                    success: false
                })
            }
        })
    } else {
        res.send({
            success: false,
            message: "id参数有误"
        })
    }

})

var validator = require('../validator');



/**
 * 
 * @api {post} /admin/add 添加管理账号
 * @apiName add
 * @apiGroup admin
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {string{长度5~16位}} loginname 登录名
 * 
 * @apiSuccess (请求成功状态：200) {Boolean} success 请求是否成功
 * @apiSuccess (请求成功状态：200) {String}  message 提示信息
 * 
 *  @apiSuccessExample {json} Success-Response:
 * {
 *     "success": true,
 *     "message": "添加成功"
 * }
 * 
 */
router.post('/add',validator.valid({
    rules:[{
        prop:"loginname",
        displayName:"登录名",
        required:true,
        min:5,
        max:16
    }],
    method:"post"
}),function(req,res){
    db.query('select * from tb_admin where loginname=?', [req.body.loginname], function (err, result) {
        if (result.length>0) {
            res.send({
                message: "当前用户已存在",
                success: false
            })
        } else {
            db.query('insert into tb_admin (loginname,password) values(?,md5(?))',[
                req.body.loginname,
                req.body.loginname+"123456"
            ],function(err,result){
                if(err){
                    res.send({
                        success:false,
                        message:"添加失败"
                    })
                }else{
                    res.send({
                        success:true,
                        message:"添加成功"
                    })
                }
            })
        }
    })
   
})


module.exports = router;