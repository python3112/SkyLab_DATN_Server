var express = require('express');
var router = express.Router();

var donhangCtrl = require('../controllers/donhang.controller');

// Vào trang home theo địa chỉ '/'
router.get('/',donhangCtrl.home);
router.get('/cho-xac-nhan',donhangCtrl.layChoXacNhan);
router.get('/cho-giao-hang',donhangCtrl.layChoGiaoHang);
router.get('/dang-giao-hang',donhangCtrl.layDangGiaoHang);
router.get('/da-giao-hang',donhangCtrl.layDaGiaoHang);
router.get('/da-huy',donhangCtrl.layDaHuy);
router.get('/chi-tiet/:id',donhangCtrl.chitiet);
router.post('/chi-tiet/:id',donhangCtrl.themTrangThaiPost);

// Xuất router
module.exports = router;