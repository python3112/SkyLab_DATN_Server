const mongoose = require('mongoose');

const pBaoHanhSchema = new mongoose.Schema({
 
  idSanpham: String,
  ngayBatDau: Date,
  ngayKetThuc: Date,
  trangThai: Boolean,
});

const PBaoHanh = mongoose.model('PBaoHanh', pBaoHanhSchema);

module.exports = PBaoHanh;
