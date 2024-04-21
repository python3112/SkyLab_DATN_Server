var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var thongkeCtrl = require('../controllers/thongke.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,thongkeCtrl.home);
router.get('/Doanh-thu', (req, res, next)=>{
    const user = req.session.Account;
    res.render('thongke/doanhthu',{title: "Thống kê" , user :  user});
})
router.get('/San-pham', (req, res, next)=>{
    const user = req.session.Account;
    res.render('thongke/doanhthu',{title: "Thống kê" , user :  user});
})
// Xuất router
module.exports = router;