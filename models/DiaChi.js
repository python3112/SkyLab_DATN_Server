const mongoose = require('mongoose');

<<<<<<< HEAD
const DiaChiSchema = new mongoose.Schema({
  Ten:String,
  Diachi:String,
  idNguoiDung_diachi: [{type : mongoose.Schema.Types.ObjectId , ref :'Account'}],
  
},{
  collection:'Diachi_table'
});

const Diachi = mongoose.model('Diachi', DiaChiSchema);

module.exports = {Diachi};
=======
const diaChiSchema = new mongoose.Schema({
  tenDiaChi: String,
  diaChi: String,
  trangThai: Boolean,
});

const DiaChi = mongoose.model('DiaChi', diaChiSchema);

module.exports = {DiaChi,diaChiSchema};
>>>>>>> f5a6fe0395111087804b87cc850084380f45ce7f
