var router = require("express").Router();
var db = require('../db');

/**
 * 
 * @api {get} /order/get 获取订单列表
 * @apiName get
 * @apiGroup order
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} keyword 关键字
 * @apiParam  {Integer} [size=10] 分页条数
 * @apiParam  {Integer} [page=1] 关键字
 * 
 * 
 * 
 */
router.get('/get', function (req, res) {
    var keyword = req.query.keyword;
    var page = parseInt(req.query.page || "1");
    var size = parseInt(req.query.size || "10");
    var sql = `SELECT Count(*) as Count FROM  tb_order as o inner join tb_customer  as c  inner join tb_ticket as t on o.CustomerId = c.Id and o.TicketId=t.Id where Title like ? or NickName like ? or Mobile like ? or ContactName like ? or WeChatBindPhone like ? or Title like ? or ShopName like ? or ShopPhone like ? or ShopAddress like ?  `;
    var params = [
        '%' + keyword + '%',
        '%' + keyword + '%',
        '%' + keyword + '%',
        '%' + keyword + '%',
        '%' + keyword + '%',
        '%' + keyword + '%',
        '%' + keyword + '%',
        '%' + keyword + '%',
        '%' + keyword + '%'
    ];
    db.query(sql, params, function (err, result) {
        params.push((page - 1) * size, size);
        db.query("SELECT o.*,c.NickName,c.AvatarUrl,c.WeChatBindPhone,t.Title,t.Price as CurrentPrice,t.ShopName,t.ShopAddress,t.ShopPhone,t.Lat,t.Long,t.Src FROM  tb_order as o inner join tb_customer  as c  inner join tb_ticket as t on o.CustomerId = c.Id and o.TicketId=t.Id where Title like ? or NickName like ? or Mobile like ? or ContactName like ? or WeChatBindPhone like ? or Title like ? or ShopName like ? or ShopPhone like ? or ShopAddress like ? order by createtime desc limit ?,?", params, function (err, result2) {
            console.log(err)
            console.log(result2)
            res.send({
                message: "查询成功",
                success: true,
                rows: result2,
                total: result[0].Count
            })
        })
    })


})

module.exports = router; 