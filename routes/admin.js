var router=require("express").Router();
var db=require("../db");


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
router.get('/get',function(req,res){
    var keyword=req.query.keyword||"";
    db.query('select Id,LoginName from tb_admin',function(err,result){
        if(err){
            res.send({
                success:false,
                message:"查询失败"
            })
        }else{
            res.send({
                success:true,
                message:"查询成功",
                rows:result
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
router.post('/delete',function(req,res){
    if(req.body.id){
        db.query('select * from tb_admin where loginname=?',[req.signedCookies.node_auth],function(err,result){
            if(result[0].Id==req.body.id){
                res.send({
                    message:"不可以删除当前登录账号",
                    success:false
                })
            }else{
                db.query('delete from tb_admin where id=?',[req.body.id],function(err,result){
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
    }
})
module.exports=router;