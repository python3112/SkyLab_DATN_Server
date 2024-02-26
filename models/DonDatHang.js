const mongoose = require('mongoose');
const donDatHangSchema = new mongoose.Schema({
  idShop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  idGioHang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GioHang'
  },
  idShipper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipper'
  },
  phuongThucThanhToan: {
    type: String,
    enum: ['Thanh toán khi nhận hàng', 'Momo'],
},
  trangThai: {
    type: String,
    enum: [
      'Chờ Xác Nhận', 'Chờ Lấy Hàng', 'Chờ Giao Hàng', 'Đã Giao', 'Đã Hủy', 'Trả Hàng'],
  },
  ThoiGian: Date.now,
  tongTien: Number,
  tienShip: Number,
  tongTien: Number,
}, {
  collection: 'DonDatHang_Table'
});

const DonDatHang = mongoose.model('DonDatHang', donDatHangSchema);

module.exports = DonDatHang;
