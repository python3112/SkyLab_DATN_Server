var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var thongbaoCtrl = require('../controllers/thongbao.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',thongbaoCtrl.home);
router.post('/', thongbaoCtrl.sendNotification);

// Xuất router
module.exports = router;