const {realtimeDatabase} = require('./firebase.config');
const {SanPham} = require('../models/SanPham');

const getAllSpGioHang =  async (idGioHang) =>{
    const GioHangRef = realtimeDatabase.ref(idGioHang)
    const GioHangSnapShot = await GioHangRef.once('value');
    const listSanPham =  GioHangSnapShot.val();
    console.log('chạy thành công ')
    return listSanPham;  
}

const addSpGioHang = async(idGioHang , idSp ) =>{
    
}



module.exports = {getAllSpGioHang};


