var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var homeCtrl = require('../controllers/home.controller');
var checkLogin = require('../middlewares/validation');


// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,homeCtrl.home);

// Xuất router
module.exports = router;