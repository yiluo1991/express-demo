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

var multer = require("multer");
var path=require("path");
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

router.post('/add',upload.single("file"), function (req, res) {

})
module.exports = router;