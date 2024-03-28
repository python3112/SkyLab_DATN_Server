var express = require('express');
var router = express.Router();
const DonHangCtrl = require('../../controllers/apiController/DonHang.api.controller');

router.get('/' , DonHangCtrl.GetAllDonHang);
router.get('/cho-xac-nhan/:id',DonHangCtrl.layDonHangChoXacNhan);
router.get('/cho-giao-hang/:id',DonHangCtrl.layDonHangChoGiaoHang);
router.get('/dang-giao-hang/:id',DonHangCtrl.layDonHangDangGiaoHang);
router.get('/da-giao-hang/:id',DonHangCtrl.layDonHangDaGiaoHang);
router.get('/da-huy/:id',DonHangCtrl.layDonHangDaHuy);
router.post('/add',DonHangCtrl.addDonHang);
router.post('/add-trang-thai/:id',DonHangCtrl.themTrangThai);
router.put('/editThanhToan/:id', DonHangCtrl.editThanhToan);
router.get('/da-ban/:id',DonHangCtrl.laySoLuongDonHangDaGiaoHang);
router.get('/sao/:id',DonHangCtrl.laySoSaoTrungBinh);
router.get('/lan-danh-gia/:id',DonHangCtrl.laySoLanDanhGia);
module.exports = router;