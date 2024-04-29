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
router.get('/thongke-sanpham' ,thongkeCtrl.sanpham );
router.get('/thongke-sanpham/:year',thongkeCtrl.sanphamTheoNam)
// Xuất router
router.get('/chi-tiet/:day/:month/:year',thongkeCtrl.chiTietDoanhThuNgay)
router.get('/chi-tiet/:status/:day/:month/:year',thongkeCtrl.chiTietDoanhThuNgayStatus)
module.exports = router;