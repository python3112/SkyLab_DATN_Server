const mongoose = require('mongoose');

const shipperSchema = new mongoose.Schema({
  idShipper: String,
  idDonHang: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DonDatHang' }],
  idDanhgia: String,
  nameShipper: String,
  nameShop: String,
  trangThai: Number,
});

const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = Shipper;
