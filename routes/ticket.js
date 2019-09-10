var router = require("express").Router();
var db = require("../db");

/**
 * 
 * @api {get} /ticket/get 获取门票列表
 * @apiName get
 * @apiGroup ticket
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {Integer} page 当前页码，默认1
 * @apiParam  {Integer} size 分页条数，默认10
 * @apiParam  {String} keyword 关键字
 * 
 * 
 * @apiParamExample  {querystring} 请求示例:
 * keyword=abc&page=1&size=10
 * 
 * 
 * 
 */
router.get('/get', function (req, res) {
    var page = parseInt(req.query.page || 1);
    var size = parseInt(req.query.size || 10);
    var keyword = "%" + (req.query.keyword || "") + "%"
    db.query(`select t.* 
    from tb_category as c inner join tb_ticket as t 
    on c.Id = t.CategoryId 
    where c.Name like ? or t.Title like ? or t.ShopName like ? or t.ShopAddress like ? or t.ShopPhone like ? or t.Content like ?  
    order by c.SortNum,CategoryId,SortNum,Id limit ?,?`, [keyword, keyword, keyword, keyword, keyword, keyword, (page - 1) * size, size], function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    success: false,
                    message: "查询失败"
                })
            } else {
                var data = [];
                var catids = [0];
                result.forEach(row => {
                    //补全catids
                    if (!catids.some(s => s == row.CategoryId)) {
                        catids.push(row.CategoryId)
                    }
                })
                db.query(`select * from tb_category where Id in (?) order by SortNum`, [catids],
                    function (err, result2) {
                        if (err) {
                            console.log(err);
                            res.send({
                                success: false,
                                message: "查询失败"
                            })
                        } else {
                            result2.forEach(cat => {
                                cat.Id = -cat.Id;
                                cat.children = [];
                                cat.Title = cat.Name;
                                data.push(cat);
                            })
                            result.forEach(row => {
                                var cat = data.find(item => item.Id == -row.CategoryId);
                                cat.children.push(row)
                            })

                            db.query(`select count(*) as count
                    from tb_category as c inner join tb_ticket as t 
                    on c.Id = t.CategoryId 
                    where c.Name like ? or t.Title like ? or t.ShopName like ? or t.ShopAddress like ? or t.ShopPhone like ? or t.Content like ?  `, [keyword, keyword, keyword, keyword, keyword, keyword], function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        res.send({
                                            success: false,
                                            message: "查询失败"
                                        })
                                    } else {
                                        res.send({
                                            success: true,
                                            message: "查询成功",
                                            rows: data,
                                            total: result[0].count
                                        })
                                    }
                                })
                        }

                    })




            }
        })
})







var validator = require('../validator');

var multer = require("multer");
var path = require("path");
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            //指定存储路径
            cb(null, "./public/upload")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })
})

/**
 * 
 * @api {POST} /ticket/edit 修改门票
 * @apiName edit
 * @apiGroup ticket
 * @apiVersion  1.0.0
 * @apiDescription 请使用multipart/form-data提交
 * 
 * @apiParam  {String} title 标题
 * @apiParam  {Number} price 价格
 * @apiParam  {Number} stock 库存
 * @apiParam  {String} shopname 商铺名
 * @apiParam  {String} shopaddress 商铺地址
 * @apiParam  {String} shopphone 商铺电话
 * @apiParam  {Number} lat  经度
 * @apiParam  {Number} long  纬度
 * @apiParam  {String} content 介绍
 * @apiParam  {Integer} categoryid 分类id
 * @apiParam  {Integer} enable 启用
 * @apiParam  {Integer} sortnum 排序号
 * @apiParam  {File} file 图片文件，不传则不修改图片地址
 * @apiParam  {Integer} id 门票Id
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
router.post('/edit', upload.single("file"), validator.valid({
    rules: [
        { prop: "title", displayName: "标题", required: true, max: 64 },
        { prop: "price", required: true, type: "number", displayName: "单价", min: 0, max: 9999999 },
        { prop: "stock", displayName: "库存", required: true },
        { prop: "content", displayName: "介绍", required: true },
        { prop: "lat", type: "number" },
        { prop: "long", type: "number" },
        { prop: "categoryid", displayName: "分类", required: true },
        { prop: "enable", displayName: "状态", type: "number", required: true, min: 0, max: 1 },
        { prop: "sortnum", displayName: "排序号", required: true, min: 0, max: 99999999 },
    ],
    method: "post"
}), function (req, res) {
    var arr = [req.body.title, req.body.price, req.body.stock, req.body.shopname, req.body.shopaddress, req.body.shopphone, req.body.lat, req.body.long, req.body.content, req.body.categoryid, req.body.enable, req.body.sortnum, req.body.id];
    var sql = 'update `tksale`.`tb_ticket` Set `Title`=?,`Price`=?, `Stock`=?,`ShopName`=?,`ShopAddress`=?,`ShopPhone`=?,`Lat`=?,`Long`=?,`Content`=?' + (req.file ? ',`Src`=?' : "") + ',`CategoryId`=?,`Enable`=?,`SortNum`=? where Id=?';
    if (req.file) {
        arr.splice(9, 0,"/upload/" + req.file.filename);
    }
    db.query(
        sql, arr,
        function (err, result) {
            if (err) {
                console.log(err);
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
                } else {
                    res.send({
                        success: false,
                        message: "没有找到要修改的数据"
                    })
                }
            }
        }
    );
})


/**
 * 
 * @api {POST} /ticket/add 添加门票
 * @apiName add
 * @apiGroup ticket
 * @apiVersion  1.0.0
 * @apiDescription 请使用multipart/form-data提交
 * 
 * @apiParam  {String} title 标题
 * @apiParam  {Number} price 价格
 * @apiParam  {Number} stock 库存
 * @apiParam  {String} shopname 商铺名
 * @apiParam  {String} shopaddress 商铺地址
 * @apiParam  {String} shopphone 商铺电话
 * @apiParam  {Number} lat  经度
 * @apiParam  {Number} long  纬度
 * @apiParam  {String} content 介绍
 * @apiParam  {Integer} categoryid 分类id
 * @apiParam  {Integer} enable 启用
 * @apiParam  {Integer} sortnum 排序号
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
router.post('/add', upload.single("file"), validator.valid({
    method: "post",
    rules: [
        { prop: "title", displayName: "标题", required: true, max: 64 },
        { prop: "price", required: true, type: "number", displayName: "单价", min: 0, max: 9999999 },
        { prop: "stock", displayName: "库存", required: true },
        { prop: "content", displayName: "介绍", required: true },
        { prop: "lat", type: "number" },
        { prop: "long", type: "number" },
        { prop: "categoryid", displayName: "分类", required: true },
        { prop: "enable", displayName: "状态", type: "number", required: true, min: 0, max: 1 },
        { prop: "sortnum", displayName: "排序号", required: true, min: 0, max: 99999999 },
    ]
}), function (req, res) {
    if (req.file) {
        db.query(
            'INSERT INTO `tksale`.`tb_ticket` (`Title`,`Price`, `Stock`,`ShopName`,`ShopAddress`,`ShopPhone`,`Lat`,`Long`,`Content`,`Src`,`CategoryId`,`Enable`,`SortNum`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.title, req.body.price, req.body.stock, req.body.shopname, req.body.shopaddress, req.body.shopphone, req.body.lat, req.body.long, req.body.content, "/upload/" + req.file.filename, req.body.categoryid, req.body.enable, req.body.sortnum],
            function (err, result) {
                if (err) {
                    console.log(err);
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
            message: "添加门票时必须上传图片"
        })
    }
})


/**
 * 
 * @api {POST} /ticket/delete 删除门票
 * @apiName delete
 * @apiGroup ticket
 * @apiVersion  1.0.0
 * 
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
        db.query('delete from tb_ticket where Id=?', [req.body.id],
            function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({
                        success: false,
                        message: "删除失败，该门票正在被使用"
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