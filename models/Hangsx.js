const mongoose = require('mongoose');

const hangsxSchema = new mongoose.Schema({
  idHang: String,
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  tenHangSx: String,
  trangThai: Number,
});

const Hangsx = mongoose.model('Hangsx', hangsxSchema);

module.exports = Hangsx;
