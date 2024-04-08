var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var sanphamCtrl = require('../controllers/sanpham.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',sanphamCtrl.home);
router.get('/chi-tiet/:id',sanphamCtrl.chiTiet);
router.get('/add',sanphamCtrl.add);

// Xuất router
module.exports = router;