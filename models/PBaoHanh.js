const mongoose = require('mongoose');

const pBaoHanhSchema = new mongoose.Schema({
  idPBaoHanh: String,
  idSanpham: String,
  ngayBatDau: Date,
  ngayKetThuc: Date,
  trangThai: Boolean,
});

const PBaoHanh = mongoose.model('PBaoHanh', pBaoHanhSchema);

module.exports = PBaoHanh;
