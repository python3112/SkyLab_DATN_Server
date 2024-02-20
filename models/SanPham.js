const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
  soLuong: Number,
  tenSanPham:String,
  trangThai: Boolean,
  giaTien: Number,
  chieuCao:Number,
  chieuRong:Number,
  trongLuong: Number,
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
