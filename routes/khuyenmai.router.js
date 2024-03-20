var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var khuyenmaiCtrl = require('../controllers/khuyenmai.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',khuyenmaiCtrl.home);

// Xuất router
module.exports = router;