const { SanPhamYT } = require('../../models/SanPhamYeuThich');

exports.addYeuThich = async (req, res) => {
    try {
        const { idSanPham, idAccount } = req.body;
        // Kiểm tra xem đã tồn tại hay chưa
        const existingYT = await SanPhamYT.findOne({ idSanPham, idAccount });

        if (existingYT) {
            // Nếu đã tồn tại, xóa bản ghi cũ
            await SanPhamYT.findOneAndDelete({ idSanPham, idAccount });
            return res.status(200).json({ success: false,message:"Đã xóa sản phẩm yêu thích!" });
        } else {
            // Nếu chưa tồn tại, thêm mới
            const newYT = new SanPhamYT({ idSanPham, idAccount });
            const savedYT = await newYT.save();
            return res.status(201).json({ success: true,message:"Đã thêm sản phẩm yêu thích!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getByIdAccount = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ params
        // Tìm tất cả các sản phẩm yêu thích của tài khoản có id là id
        const danhSachSanPhamYeuThich = await SanPhamYT.find({ idAccount: id });
        return res.status(200).json(danhSachSanPhamYeuThich);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.checkYeuThich = async (req, res) => {
    try {
        const { idSanPham, idAccount } = req.body;
        // Kiểm tra xem đã tồn tại hay chưa
        const existingYT = await SanPhamYT.findOne({ idSanPham, idAccount });
        if (existingYT) {
            return res.status(200).json({ success: true});
        } else {
            return res.status(201).json({ success: false});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        // Xóa sản phẩm yêu thích dựa trên ID của nó
        await SanPhamYT.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Đã xóa sản phẩm yêu thích!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};