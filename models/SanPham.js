const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
  idHangSx: { type: mongoose.Schema.Types.ObjectId, ref: 'Hangsx' },
  soLuong: Number,
  tenSanPham:String,
  trangThai: Boolean,
  giaTien: Number,
  anhSanPham:String,
  anh: [String],
  

  cpu: String,
  soNhan:Number,
  soLuongCPU:Number,
  tocDoCPU: String,
  tocDoToiDa:String,
  boNhoDem:String,

  ram: String,
  loaiRam:String,
  tocDoBusRam:String,
  hoTroRamToiDa: String,
  rom: String,

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
