var express = require('express');
var router = express.Router();

var donhangCtrl = require('../controllers/donhang.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,donhangCtrl.home);
router.get('/chi-tiet/:id',donhangCtrl.chitiet);
router.post('/chi-tiet/:id',donhangCtrl.themTrangThaiPost);

// Xuất router
module.exports = router;