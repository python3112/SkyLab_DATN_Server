var express = require('express');
var router = express.Router();
const PtttCtrl = require('../../controllers/apiController/PTTT.api.controller');

router.get('/', PtttCtrl.getAllPTTT);

module.exports = router;
