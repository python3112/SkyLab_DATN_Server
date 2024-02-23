var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();



var AccountApi = require('./routes/api/Account.api.router');
var PhanQuyenApi =  require('./routes/api/PhanQuyen.api.router');

var connectDB = require('./models/Database');


var connectDB = require('./models/Database');

// api
var routerApiHangSx = require('./routes/api/HangSx.api.router');

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



app.use('/account-api' , AccountApi);
app.use('/phanquyen-api' , PhanQuyenApi);


app.use('/api/hangsx', routerApiHangSx);


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
