var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var thongkeCtrl = require('../controllers/thongke.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,thongkeCtrl.home);
router.get('/Doanh-thu/',checkLogin.checkLogin,thongkeCtrl.doanhThu)
router.get('/Doanh-thu/:year',checkLogin.checkLogin,thongkeCtrl.doanhThuTheoNam)
router.get('/San-pham', checkLogin.checkLogin,(req, res, next)=>{
    const user = req.session.Account;
    res.render('thongke/doanhthu',{title: "Thống kê" , user :  user});
})
router.get('/chi-tiet/:month/:year',checkLogin.checkLogin, thongkeCtrl.chiTietDoanhThu)
router.get('/thongke-sanpham' ,checkLogin.checkLogin,thongkeCtrl.sanpham );
router.get('/thongke-sanpham/:year',checkLogin.checkLogin,thongkeCtrl.sanphamTheoNam);
router.get('/thongke-sanpham/:month/:year',checkLogin.checkLogin, thongkeCtrl.chiTietDoanhThuSp);
// Xuất router
router.get('/chi-tiet/:day/:month/:year',checkLogin.checkLogin,thongkeCtrl.chiTietDoanhThuNgay)
router.get('/chi-tiet/:status/:day/:month/:year',checkLogin.checkLogin,thongkeCtrl.chiTietDoanhThuNgayStatus)
module.exports = router;