var router = require("express").Router();
var db = require("../db");
router.get('/get', function (req, res) {
    var keyword = req.query.keyword || "";
    var page = parseInt(req.query.page || 1) ;
    var size = parseInt(req.query.size || 10) ;
    //一共多少条数据
    //当页的数据
    db.query("select count(*) as count from tb_customer  where NickName like ? or Country like ? or Province like ? or City like ?  order  by Id ",
        ['%' + keyword + "%", '%' + keyword + "%", '%' + keyword + "%", '%' + keyword + "%"],
        function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    success: false,
                    message: "服务器内部错误"
                })
            } else {
                var total = result[0].count; 
                db.query("select * from tb_customer  where NickName like ? or Country like ? or Province like ? or City like ?  order  by Id  limit ?,?",
                    ['%' + keyword + "%", '%' + keyword + "%", '%' + keyword + "%", '%' + keyword + "%", ((page-1)*size) , size],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send({
                                success: false,
                                message: "服务器内部错误"
                            })
                        } else {
                           res.send({
                               success:true,
                               message:"请求成功",
                               rows:result,
                               total:total
                           })
                        }
                    })
            }
        })

});
module.exports = router;