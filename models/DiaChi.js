const mongoose = require('mongoose');
const DiaChiSchema = new mongoose.Schema({
  Ten:String,
  Diachi:String,
 
},{
  collection:'Diachi_table'
});

const Diachi = mongoose.model('Diachi', DiaChiSchema);

module.exports = {Diachi , DiaChiSchema};
