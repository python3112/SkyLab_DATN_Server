var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var thongkeCtrl = require('../controllers/thongke.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,thongkeCtrl.home);

// Xuất router
module.exports = router;