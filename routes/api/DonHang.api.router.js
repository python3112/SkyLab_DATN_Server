var express = require('express');
var router = express.Router();
const DonHangCtrl = require('../../controllers/apiController/DonHang.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', DonHangCtrl.GetAllDonHang);
router.get('/get-by-id/:id', DonHangCtrl.getByID);
router.get('/cho-xac-nhan/:id', DonHangCtrl.layDonHangChoXacNhan);
router.get('/cho-giao-hang/:id', DonHangCtrl.layDonHangChoGiaoHang);
router.get('/dang-giao-hang/:id', DonHangCtrl.layDonHangDangGiaoHang); 
router.get('/sl-cho-xac-nhan/:id', DonHangCtrl.laySoLuongDonHangChoXacNhan);
router.get('/sl-cho-giao-hang/:id', DonHangCtrl.laySoLuongDonHangChoGiaoHang);
router.get('/sl-dang-giao-hang/:id', DonHangCtrl.laySoLuongDonHangDangGiaoHang);
router.get('/da-giao-hang/:id', DonHangCtrl.layDonHangDaGiaoHang);
router.get('/da-huy/:id', DonHangCtrl.layDonHangDaHuy);
router.get('/tra-hang/:id', DonHangCtrl.layDonHangTraHang);
router.post('/add', DonHangCtrl.addDonHang);
router.post('/add-trang-thai/:id', DonHangCtrl.themTrangThai);
router.put('/editThanhToan/:id', DonHangCtrl.editThanhToan);
router.get('/da-ban/:id', DonHangCtrl.laySoLuongDonHangDaGiaoHang);
router.get('/sao/:id', DonHangCtrl.laySoSaoTrungBinh);
router.get('/lan-danh-gia/:id', DonHangCtrl.laySoLanDanhGia);
router.put('/bao-hanh/:iddh/:idbh',upload.any('image'), DonHangCtrl.updateBaoHanh);
module.exports = router;