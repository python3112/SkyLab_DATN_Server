const express = require('express');
const router = express.Router();
const PhanQuyenController  =  require('../../controllers/apiController/PhanQuyen.api.controller');



router.get('/' ,PhanQuyenController.getPhanQuyen );
router.post('/' , PhanQuyenController.ThemPhanQuyen);

module.exports = router;