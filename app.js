var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();


var connectDB = require('./models/Database');

// Web
var homeRoute= require('./routes/home.router');



// api
var routerApiHangSx = require('./routes/api/HangSx.api.router');
var routerApiAccount = require('./routes/api/Account.api.router');
var routerApiSanPham = require('./routes/api/SanPham.api.router');
var routerApiGioHang= require('./routes/api/Giohang.api.router');
var routerApiKhuyenMai= require('./routes/api/KhuyenMai.api.router');
var routerApiDonHang = require('./routes/api/DonHang.api.router');
var routerApiMess = require('./routes/api/Mess.api.router');
var routerApiChat = require('./routes/api/Chat.api.router');
var routerApiDanhGia = require('./routes/api/DanhGia.api.router');
var routerApiYeuThich = require('./routes/api/SanPhamYT.router');


var app = express();

// Kết nối đến MongoDB
connectDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);

// API
app.use('/api/hangSx', routerApiHangSx);
app.use('/api/account',routerApiAccount);
app.use('/api/sanPham',routerApiSanPham);
app.use('/api/gioHang' , routerApiGioHang);
app.use('/api/khuyenMai' , routerApiKhuyenMai);
app.use('/api/donHang' , routerApiDonHang);
app.use('/api/mess' , routerApiMess);
app.use('/api/danhGia' , routerApiDanhGia);
app.use('/api/chat' , routerApiChat);
app.use('/api/yeuThich' , routerApiYeuThich);

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
