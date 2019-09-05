var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views')); //设定视图文件夹位置
app.set('view engine', 'ejs'); //视图模板引擎

// app.use(function(req,res,next){
//   res.setHeader("Access-Control-Allow-Origin","*");
//   res.setHeader("Access-Control-Allow-Methods","POST,GET");
//   res.setHeader("Access-Control-Allow-Credentials",true);
//   res.setHeader("Access-Control-Allow-Headers","Content-Type,Accept");
//   next();
// });

app.use(logger('dev')); //日志记录
app.use(express.json()); //处理json数据
app.use(express.urlencoded({ extended: false }));  //处理提交的querystring和post提交的主体内容数据
app.use(cookieParser(['abc','ccc'])); //处理cookie
app.use(express.static(path.join(__dirname, 'public'))); //设定公共资源文件夹



app.use('/login',require('./routes/login'));
app.use("/category",require("./routes/category"));
app.use("/customer",require("./routes/customer"));
app.use("/ads",require("./routes/ads"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
