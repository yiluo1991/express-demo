var router = require("express").Router();
var db = require('../db');

/**
 * 
 * @api {get} /category/get 获取分类列表
 * @apiName get
 * @apiGroup category
 * @apiVersion  1.0.0
 * @apiPermission 登录用户
 * @apiParam  {String} [keyword] 查询关键字
 * 
 * 
 * @apiParamExample  {querystring} 请求示例:
 * keyword=123
 * 
 * @apiSuccessExample {type} 请求成功响应示例:
 * {
 *     "success":true,
 *     "message":"查询成功",
 *     "rows":[{
 *          "Id":1,
 *          "Name":"旅游",
 *          "Src":"/public/1.jpg",
 *          "SrotNum":100,
 *          "Enable":1
 *      }]
 * }
 * 
 * 
 */
router.get('/get', function (req, res) {
    //undefined,null,0,""都会返回""
    var keyword = req.query.keyword || "";
    db.query("select * from tb_category  where Name like ? order  by SortNum ",
        ['%' + keyword + "%"],
        function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    success: false,
                    message: "服务器内部错误"
                })
            } else {
                res.send({
                    success: true,
                    message: "请求成功",
                    rows: result
                })
            }
        })
})

var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        //指定存储路径
        cb(null, "./public/upload")
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage });

/**
 * 
 * @api {POST} /category/add 添加分类
 * @apiName add
 * @apiGroup category
 * @apiVersion  1.0.0
 * @apiPermission 登录用户
 * @apiDescription 请使用multipart/form-data提交
 * @apiSampleRequest off
 * @apiParam  {String} name 分类名
 * @apiParam  {String} sortnum 排序号
 * @apiParam  {Integer=1,0} enable 是否启用，1启用，0禁用
 * @apiParam  {File} file 图片文件
 * 
 * @apiSuccess (请求成功状态：200) {Boolean} success 请求是否成功
 * @apiSuccess (请求成功状态：200) {String}  message 提示信息
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success": true,
 *     "message": "添加成功"
 * }
 * 
 * 
 */
router.post('/add',
    upload.single("file"),
    function (req, res, next) {
        if (req.file) {
            db.query(
                'insert into tb_category (`Name`,`SortNum`,`Enable`,`Src`) values (?,?,?,?)',
                [req.body.name, req.body.sortnum, req.body.enable, "/upload/" + req.file.filename],
                function (err, result) {
                    if (err) {
                        res.send({
                            success: false,
                            message: "添加失败"
                        })
                    } else {
                        res.send({
                            success: true,
                            message: "添加成功"
                        })
                    }
                }
            );
        } else {
            res.send({
                success: false,
                message: "添加分类时必须上传图片"
            })
        }
    });


/**
 * 
 * @api {POST} /category/edit 修改分类
 * @apiName edit
 * @apiGroup category
 * @apiVersion  1.0.0
  * @apiPermission 登录用户
 * @apiDescription 请使用multipart/form-data提交
 * @apiSampleRequest off
 * @apiParam  {String} name 分类名
 * @apiParam  {String} sortnum 排序号
 * @apiParam  {Integer=1,0} enable 是否启用，1启用，0禁用
 * @apiParam  {File} [file] 图片文件
 * @apiParam  {Integer} id Id
 * 
 * @apiSuccess (请求成功状态：200) {Boolean} success 请求是否成功
 * @apiSuccess (请求成功状态：200) {String}  message 提示信息
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "success": true,
 *     "message": "修改成功"
 * }
 * 
 * 
 */
router.post('/edit',
    upload.single("file"),
    function (req, res, next) {
        if (req.file) {
            db.query(
                'update tb_category set `Name`=?,`SortNum`=?,`Enable`=?,`Src`=? where `Id`=?',
                [req.body.name, req.body.sortnum, req.body.enable, "/upload/" + req.file.filename, req.body.id],
                function (err, result) {
                    if (err) {
                        res.send({
                            success: false,
                            message: "修改失败"
                        })
                    } else {
                        if (result.affectedRows > 0) {
                            res.send({
                                success: true,
                                message: "修改成功"
                            })
                        }else{
                            res.send({
                                success: false,
                                message: "没有找到要修改的数据"
                            })
                        }
                    }
                }
            );
        } else {
            db.query(
                'update tb_category set `Name`=?,`SortNum`=?,`Enable`=? where `Id`=?',
                [req.body.name, req.body.sortnum, req.body.enable,  req.body.id],
                function (err, result) {
                    if (err) {
                        res.send({
                            success: false,
                            message: "修改失败"
                        })
                    } else {
                        if (result.affectedRows > 0) {
                            res.send({
                                success: true,
                                message: "修改成功"
                            })
                        }else{
                            res.send({
                                success: false,
                                message: "没有找到要修改的数据"
                            })
                        }
                    }
                }
            );
        }
    });

/**
 * 
 * @api {POST} /category/delete 删除分类
 * @apiName delete
 * @apiGroup category
 * @apiVersion  1.0.0
 * @apiPermission 登录用户
 * @apiParam  {Integer} id Id
 * @apiSampleRequest off
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
        db.query('delete from tb_category where Id=?', [req.body.id],
            function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({
                        success: false,
                        message: "服务器内部错误"
                    })
                } else {
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

                }
            })
    } else {
        res.send({
            success: false,
            message: "缺少id参数"
        })
    }
})


module.exports = router;
