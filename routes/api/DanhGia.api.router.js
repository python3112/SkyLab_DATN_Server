var express = require('express');
var router = express.Router();
const danhGiaCtrl = require('../../controllers/apiController/DanhGia.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/by-idSanPham/:id', danhGiaCtrl.getDaDanhGiaByIdSP);
router.get('/da-danh-gia/:id', danhGiaCtrl.getDaDanhGia);
router.get('/chua-danh-gia/:id', danhGiaCtrl.getChuaDanhGia);
router.get('/sl-chua-danh-gia/:id', danhGiaCtrl.getSoLuongChuaDanhGia);
router.post('/:id',upload.any('image'),danhGiaCtrl.themDanhGia);

module.exports = router;