var express = require('express');
var router = express.Router();
const hangSXCtrl = require('../../controllers/apiController/HangSx.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', hangSXCtrl.getAllHangsx);
router.get('/:id', hangSXCtrl.getHangsxById);
router.post('/add', upload.single('image'), hangSXCtrl.postHangSx);
router.put('/edit/:id', upload.single('image'), hangSXCtrl.editHangSx);

module.exports = router;