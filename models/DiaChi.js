const mongoose = require('mongoose');
const DiaChiSchema = new mongoose.Schema({
  Ten:String,
  Diachi:String,
  idNguoiDung_diachi: [{type : mongoose.Schema.Types.ObjectId , ref :'Account'}],
},{
  collection:'Diachi_table'
});

const Diachi = mongoose.model('Diachi', DiaChiSchema);

module.exports = {Diachi , DiaChiSchema};
