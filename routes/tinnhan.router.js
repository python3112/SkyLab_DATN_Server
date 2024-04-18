var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var tinnhanCtrl = require('../controllers/tinnhan.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,tinnhanCtrl.home);

// Xuất router
module.exports = router;