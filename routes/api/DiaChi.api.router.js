const express = require('express');
const router = express.Router();
const controller = require('../../controllers/apiController/DiaChi.api.controller');

// Router để lấy ra tất cả các level1
router.get('/level1', controller.getAllLevel1);

// Router để lấy ra các level2 của một level1 cụ thể
router.get('/level1/:level1Id/level2', controller.getLevel2OfLevel1);

// Router để lấy ra các level3 của một level2 cụ thể của một level1 cụ thể
router.get('/level1/:level1Id/level2/:level2Id/level3', controller.getLevel3OfLevel2);

module.exports = router;
