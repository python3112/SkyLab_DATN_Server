const mongoose = require('mongoose');

const trangThaiDonHangSchema = new mongoose.Schema({
  trangThai: {
    type: String,
    enum: ['Chờ xác nhận', 'Chờ giao hàng', 'Đã giao hàng', 'Đã hủy', 'Trả hàng','Đã đánh giá'],
    default: 'Chờ xác nhận',
    required: true
  },
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
  soLuong:Number,
  tongTien: Number,
  ghiChu: String,
}, {
  collection: 'DonDatHang_Table'
});

const DonDatHang = mongoose.model('DonDatHang', donDatHangSchema);

module.exports = DonDatHang;
