const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
  idShop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  idHangSx: { type: mongoose.Schema.Types.ObjectId, ref: 'Hangsx' },
  idLoaiSp: { type: mongoose.Schema.Types.ObjectId, ref: 'TheloaiSp' },
  soLuong: Number,
  tenSanPham:String,
  trangThai: Boolean,
  giaTien: Number,
  chieuCao:String,
  chieuRong:String,
  chieuDoc:String,
  trongLuong: String,
  ram: String,
  rom: String,
  baohanh: String,
  os: String,
  cpu: String,
  gpu: String,
  pin: String,
  display: String,
  moTa: String,
  phuKien:String,
  mauSac:String,
  doPhanGiai: String,
  tanSoQuet:String,
  tamNen:String,
  anh: [String],
} , {
  collection :  'SanPham_table'
});

const SanPham = mongoose.model('SanPham', sanPhamSchema);

module.exports = {SanPham,sanPhamSchema};
