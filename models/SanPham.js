const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
  idSanpham: String,
  soLuong: Number,
  trangThai: Number,
  giaTien: Number,
  weight: Number,
  os: String,
  cpu: String,
  gpu: String,
  display: String,
  moTa: String,
  anh: [String],
});

const SanPham = mongoose.model('SanPham', sanPhamSchema);

module.exports = SanPham;
