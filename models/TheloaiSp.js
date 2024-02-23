const mongoose = require('mongoose');

const theloaiSpSchema = new mongoose.Schema({
  tenTheLoai: String,
  trangThai: Boolean,

}, {
  collection : 'TheLoai_table'

},
{
  collection:'LoaiSanPham_table'

});

const TheloaiSp = mongoose.model('TheloaiSp', theloaiSpSchema);

module.exports = TheloaiSp;
