const mongoose = require('mongoose');

const theloaiSpSchema = new mongoose.Schema({
  tenTheLoai: String,
  trangThai: Boolean,
});

const TheloaiSp = mongoose.model('TheloaiSp', theloaiSpSchema);

module.exports = TheloaiSp;
