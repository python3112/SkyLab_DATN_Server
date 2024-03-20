var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var donhangCtrl = require('../controllers/donhang.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',donhangCtrl.home);

// Xuất router
module.exports = router;