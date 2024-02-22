const mongoose = require('mongoose');

const PhanQuyenSchema = new mongoose.Schema({
  QuyenTruyCap : String,
   
}, {
  collection : 'PhanQuyen_table'
});

const PhanQuyen = mongoose.model('PhanQuyen', PhanQuyenSchema);

module.exports = PhanQuyen;