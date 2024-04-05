const { SanPham } = require('../models/SanPham');

exports.home =async (req,res,next)=>{
    try {
        const sanPham = await SanPham.find();
        res.render('sanpham/home_sanpham',{title: "Quản lý sản phẩm",listSanPham: sanPham});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.chiTiet = async (req, res) => {
    try {
        const sanPham = await SanPham.findById(req.params.id);
        res.render('sanpham/chitiet_sanpham',{title: "Chi tiết sản phẩm",sanPham: sanPham});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};