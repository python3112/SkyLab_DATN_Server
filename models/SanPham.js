const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
  soLuong: Number,
  trangThai: Boolean,
  giaTien: Number,
  weight: Number,
  os: String,
  cpu: String,
  gpu: String,
  display: String,
  moTa: String,
  anh: [String],
} , {
  collection :  'SanPham_table'
});

const SanPham = mongoose.model('SanPham', sanPhamSchema);

module.exports = SanPham;
