var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var thongkeCtrl = require('../controllers/thongke.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',thongkeCtrl.home);

// Xuất router
module.exports = router;