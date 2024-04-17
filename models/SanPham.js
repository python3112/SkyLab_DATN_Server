const mongoose = require('mongoose');
const bienTheSchema = new mongoose.Schema({
  ram: String,
  rom: String,
  soLuong: Number,
  giaTien: Number
});
const sanPhamSchema = new mongoose.Schema({
  idHangSx: { type: mongoose.Schema.Types.ObjectId, ref: 'Hangsx' },
  tenSanPham:String,
  trangThai: Boolean,
  anhSanPham:String,
  anh: [String],
  bienThe: [bienTheSchema],

  cpu: String,
  soNhan:Number,
  soLuongCPU:Number,
  tocDoCPU: String,
  tocDoToiDa:String,
  boNhoDem:String,

  loaiRam:String,
  tocDoBusRam:String,
  hoTroRamToiDa: String,

  display: String,
  doPhanGiai: String,
  tanSoQuet:String,
  doPhuMau: String,
  congNgheManHinh: String,

  moTa: String,
  mauSac:String,
  gpu: String,
  congNgheAmThanh:String,

  congGiaoTiep: String,
  ketNoiKhongDay: String,
  webCam:String,
  tinhNangKhac: String,
  denBanPhim: String,

  kichThuocKhoiLuong:String,
  chatLieu:String,

  pin: String,
  congSuatSac: String,
  thoiDiemRaMat: String,
  baohanh: String,
  os: String,
  phuKien:String,
} , {
  collection :  'SanPham_table'
});

const SanPham = mongoose.model('SanPham', sanPhamSchema);

module.exports = {SanPham,sanPhamSchema};
