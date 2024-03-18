const mongoose = require('mongoose');

const sanPhamYTSchema = new mongoose.Schema({
  idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' },
  idAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
} , {
  collection :  'SanPhamYeuThich_table'
});

const SanPhamYT = mongoose.model('SanPhamYeuThich', sanPhamYTSchema);

module.exports = {SanPhamYT};
