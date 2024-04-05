var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var thongbaoCtrl = require('../controllers/thongbao.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',thongbaoCtrl.home);

// Xuất router
module.exports = router;