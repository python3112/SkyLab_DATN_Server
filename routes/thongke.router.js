var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var thongkeCtrl = require('../controllers/thongke.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,thongkeCtrl.home);
router.get('/Doanh-thu/',thongkeCtrl.doanhThu)
router.get('/Doanh-thu/:year',thongkeCtrl.doanhThuTheoNam)
router.get('/San-pham', (req, res, next)=>{
    const user = req.session.Account;
    res.render('thongke/doanhthu',{title: "Thống kê" , user :  user});
})
router.get('/chi-tiet/:month/:year', thongkeCtrl.chiTietDoanhThu)
// Xuất router
module.exports = router;