const mongoose = require('mongoose');

const theloaiSpSchema = new mongoose.Schema({
  tenTheLoai: String,
  trangThai: Boolean,
<<<<<<< HEAD
}, {
  collection : 'TheLoai_table'
=======
},
{
  collection:'LoaiSanPham_table'
>>>>>>> f5a6fe0395111087804b87cc850084380f45ce7f
});

const TheloaiSp = mongoose.model('TheloaiSp', theloaiSpSchema);

module.exports = TheloaiSp;
