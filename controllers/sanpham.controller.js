const { SanPham } = require('../models/SanPham');
const Hangsx = require('../models/Hangsx'); 

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
exports.add = async (req, res) => {
    try {
        // Lấy danh sách hãng sản xuất 
        const listHangSx = await Hangsx.find({ trangThai: true }); 
        res.render('sanpham/add_san_pham', {
            title: "Thêm sản phẩm mới",
            listHangSx: listHangSx 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.edit = async (req, res) => {
    try {
        const product = await SanPham.findById(req.params.id);
        const listHangSx = await Hangsx.find({ trangThai: true });
        res.render('sanpham/sua_san_pham', {
            title: "Chỉnh sửa sản phẩm",
            product: product,
            listHangSx: listHangSx
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
