const mongoose = require('mongoose');

const hoaDonSchema = new mongoose.Schema({
  idHoaDon: String,
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  idShipper: String,
  soTienShip: Number,
  tongTien: Number,
  trangThai: Number,
});

const HoaDon = mongoose.model('HoaDon', hoaDonSchema);

module.exports = HoaDon;
