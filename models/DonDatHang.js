const mongoose = require('mongoose');

const trangThaiDonHangSchema = new mongoose.Schema({
  trangThai: {
    type: String,
    enum: ['Chờ xác nhận', 'Chờ giao hàng', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy'],
    default: 'Chờ xác nhận',
    required: true
  },
  isNow: { type: Boolean, default: true },
  thoiGian: { type: Date, default: Date.now }
});
const DanhGiaSchema = new mongoose.Schema({
  soSao: Number,
  anh: [String],
  noiDung: String,
  thoiGian: { type: Date, default: Date.now }
});
const donDatHangSchema = new mongoose.Schema({
  idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' },
  idAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  idKhuyenMai: { type: mongoose.Schema.Types.ObjectId, ref: 'KhuyenMai' },
  trangThai: {
    type: [trangThaiDonHangSchema],
    default: [{ trangThai: 'Chờ xác nhận' }]
  },
  danhGia: {
    type: DanhGiaSchema,
  },
  soLuong: Number,
  tienShip: Number,
  tongTien: Number,
  ghiChu: String,
  thanhToan: Boolean,
}, {
  collection: 'DonDatHang_Table'
});

const DonDatHang = mongoose.model('DonDatHang', donDatHangSchema);

module.exports = DonDatHang;
