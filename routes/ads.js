var router = require("express").Router();  
var db = require("../db");
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //指定存储路径
        cb(null, "./public/upload")
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
}); 
var upload = multer({ storage: storage });

//查询数据
router.get('/get', function (req, res) {
    var keyword = req.query.keyword || "";
    db.query("select * from tb_ads where src like ? order by SortNum", ['%' + keyword + "%"], function (err, result) {
        if (err) {
            console.log(err);
            res.send({ success: false, message: "查询失败" })
        } else {
            res.send({ success: true, message: "查询成功", rows: result });
        }
    });
});

//添加
router.post("/add", upload.single('file'), function (req, res) {
    if (req.file) {
        db.query(
            'insert into tb_ads (`SortNum`,`Enable`,`Src`) values (?,?,?)',
            [req.body.sortnum, req.body.enable, "/upload/" + req.file.filename],
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
            message: "添加轮播图时必须上传图片"
        })
    }
})


//修改
router.post('/edit', upload.single("file"), function (req, res, next) {
    if (req.file) {
        db.query('update tb_ads set `SortNum`=?,`Enable`=?,`Src`=? where `Id`=?', [req.body.sortnum, req.body.enable, "/upload/" + req.file.filename, req.body.id], function (err, result) {
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
                    } else {
                        res.send({
                            success: false,
                            message: "没有找到要修改的数据"
                        })
                    }
                }
            }
        );
    } else {
        db.query('update tb_ads set `SortNum`=?,`Enable`=? where `Id`=?', [req.body.sortnum, req.body.enable, req.body.id], function (err, result) {
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
                } else {
                    res.send({
                        success: false,
                        message: "没有找到要修改的数据"
                    })
                }
            }
        });
    }
});
//删除
router.post('/delete', function (req, res) {
    if (req.body.id) {
        db.query('delete from tb_ads where Id=?', [req.body.id],
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