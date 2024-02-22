var express = require('express');
var router = express.Router();
const LoaiSpCtrl = require('../../controllers/apiController/LoaiSp.api.controller');



router.get('/', LoaiSpCtrl.getAllLoaiSp);
router.get('/:id',LoaiSpCtrl.getLoaiSpById);
router.post('/add',LoaiSpCtrl.postLoaiSp);
router.put('/edit/:id',LoaiSpCtrl.editLoaiSp);

module.exports = router;