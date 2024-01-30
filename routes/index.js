var express = require('express');
const { db } = require('../models/Account');
var router = express.Router();
db.db


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
