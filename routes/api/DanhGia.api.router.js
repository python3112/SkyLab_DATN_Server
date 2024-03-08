var express = require('express');
var router = express.Router();
const danhGiaCtrl = require('../../controllers/apiController/DanhGia.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:id', danhGiaCtrl.getDaDanhGia);
router.get('/chuaDanhGia/:id', danhGiaCtrl.getChuaDanhGia);
router.post('/:id', upload.any('image'),danhGiaCtrl.themDanhGia);


module.exports = router;