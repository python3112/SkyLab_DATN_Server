const mongoose = require('mongoose');

const hangsxSchema = new mongoose.Schema({
  tenHangSx: String,
  trangThai: Boolean,
  imageLogo: String,
}, {
  collection:'HangSanXuat_table'
});

const Hangsx = mongoose.model('Hangsx', hangsxSchema);

module.exports = Hangsx;
