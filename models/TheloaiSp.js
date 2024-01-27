const mongoose = require('mongoose');

const theloaiSpSchema = new mongoose.Schema({
  idTheLoai: String,
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  tenTheLoai: String,
  trangThai: Number,
});

const TheloaiSp = mongoose.model('TheloaiSp', theloaiSpSchema);

module.exports = TheloaiSp;
