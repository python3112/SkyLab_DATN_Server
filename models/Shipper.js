const mongoose = require('mongoose');

const shipperSchema = new mongoose.Schema({
  
  idDonHang: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DonDatHang' }],
  idDanhgia: String,
  nameShipper: String,
  nameShop: String,
  trangThai: Boolean,
}, {
  collection:'Shipper_table'
});

const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = Shipper;
