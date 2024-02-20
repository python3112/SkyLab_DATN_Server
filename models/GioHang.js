const mongoose = require('mongoose');

const GioHangSchema = new mongoose.Schema({
    SoLuong:Number, 
    idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
    idNguoiMua:{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Account'},
}, {
    collection:'GioHang_Table'
})

const GioHang = mongoose.model('GioHang', GioHangSchema);
module.exports = GioHang;
