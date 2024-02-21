var express = require('express');
const { Account } = require('../models/Account');
var router = express.Router();
var api = require('../ApiClient/AccountApi');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
