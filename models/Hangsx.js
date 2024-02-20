const mongoose = require('mongoose');

const hangsxSchema = new mongoose.Schema({
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  tenHangSx: String,
  trangThai: Boolean,
}, {
  collection:'HangSanXuat_table'
});

const Hangsx = mongoose.model('Hangsx', hangsxSchema);

module.exports = Hangsx;
