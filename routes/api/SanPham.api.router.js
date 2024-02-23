var express = require('express');
var router = express.Router();
const SanPhamCtrl = require('../../controllers/apiController/SanPham.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', SanPhamCtrl.getAllSanPham);
router.get('/shop/:id', SanPhamCtrl.getSanPhamByIdShop);
router.get('/:id', SanPhamCtrl.getSanPhamById);
router.post('/add',upload.any("image"), SanPhamCtrl.createSanPham);
router.put('/edit/:id',upload.any("image"),SanPhamCtrl.updateSanPhamById);

module.exports = router;