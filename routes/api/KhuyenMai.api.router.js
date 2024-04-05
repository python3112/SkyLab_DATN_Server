var express = require('express');
var router = express.Router();
const KhuyenMaiCtrl = require('../../controllers/apiController/KhuyenMai.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', KhuyenMaiCtrl.getAllKhuyenMai);
router.get('/get-all', KhuyenMaiCtrl.getAll);
router.post('/add', upload.single('image'), KhuyenMaiCtrl.addKhuyenMai);
module.exports = router;
