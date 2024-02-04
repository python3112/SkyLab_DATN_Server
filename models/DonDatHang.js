const mongoose = require('mongoose');

const donDatHangSchema = new mongoose.Schema({
  idDonDatHang: String,
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  soTienShip: Number,
  tongTien: Number,
  trangThai: Number,
},{
  collection:'DonDatHang_Table'
});

const DonDatHang = mongoose.model('DonDatHang', donDatHangSchema);

module.exports = DonDatHang;
