const mongoose = require('mongoose')
const ThanhToanSchema = new mongoose.Schema({
    tenPhuongThuc:String,
} , {
    collection:'thanhtoan_table'
})
const thanhToan = mongoose.model('thanhToan' , ThanhToanSchema);
module.exports = thanhToan;