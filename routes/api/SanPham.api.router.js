var express = require('express');
var router = express.Router();
const SanPhamCtrl = require('../../controllers/apiController/SanPham.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', SanPhamCtrl.getAllSanPham);
router.get('/hang/:id', SanPhamCtrl.getSanPhamByIdHang);
router.get('/get-by-id/:id', SanPhamCtrl.getSanPhamById);
router.get('/cpu/:cpu', SanPhamCtrl.getSanPhamByCpu);
router.get('/filter', SanPhamCtrl.filterSanPham);
router.post('/add',upload.any("image"), SanPhamCtrl.createSanPham);
router.put('/edit/:id',upload.any("image"),SanPhamCtrl.updateSanPhamById);
router.post('/search', SanPhamCtrl.searchSanPham);
router.patch('/toggle-status/:id', SanPhamCtrl.toggleProductStatus);
// Biến thể
router.post('/add-variant/:id', SanPhamCtrl.addVariant);
router.put('/update-variant/:productId/:variantId', SanPhamCtrl.updateVariant);

module.exports = router;