var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var sanphamCtrl = require('../controllers/sanpham.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,sanphamCtrl.home);
router.get('/chi-tiet/:id',checkLogin.checkLogin,sanphamCtrl.chiTiet);
router.get('/edit/:id',checkLogin.checkLogin, sanphamCtrl.edit);
router.get('/add',checkLogin.checkLogin,sanphamCtrl.add);

// Xuất router
module.exports = router;