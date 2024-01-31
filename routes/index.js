var express = require('express');
const Account = require('../models/Account');
var router = express.Router();
var api = require('../ApiClient/AccountApi');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
