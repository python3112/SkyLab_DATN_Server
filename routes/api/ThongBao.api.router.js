var express = require('express');
var router = express.Router();
const thongBaoCtrl = require('../../controllers/apiController/ThongBao.api.controller');

router.get('/:id' , thongBaoCtrl.getThongBaoByIdAccount);
router.put('/da-xem/:id' , thongBaoCtrl.editDaXem);

module.exports = router;
