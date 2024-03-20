var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var hangCtrl = require('../controllers/hang.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',hangCtrl.home);

// Xuất router
module.exports = router;