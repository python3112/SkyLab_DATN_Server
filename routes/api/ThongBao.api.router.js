var express = require('express');
var router = express.Router();
const thongBaoCtrl = require('../../controllers/apiController/ThongBao.api.controller');

router.get('/:id' , thongBaoCtrl.getThongBaoByIdAccount);
router.put('/da-xem/:id' , thongBaoCtrl.editDaXem);
router.put('/da-xem-all/:id' , thongBaoCtrl.editDaXemAll);
router.delete('/xoa-theo-id-thong-bao/:id', thongBaoCtrl.xoaTheoIdThongBao);
router.delete('/xoa-theo-id-account/:id', thongBaoCtrl.xoaTheoIdAccount);

module.exports = router;
