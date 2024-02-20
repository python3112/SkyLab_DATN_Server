const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({

  idAcc: String,
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  tenShop: String,
  ttShop: Boolean,
  trangThai: Boolean,
}, {
  collection:'Shops_table'
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
