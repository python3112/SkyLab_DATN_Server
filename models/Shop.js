const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  idShop: String,
  idAcc: String,
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  tenShop: String,
  ttShop: Boolean,
  trangThai: Number,
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
