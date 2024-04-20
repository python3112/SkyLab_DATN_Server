const GioHang = require('../../models/GioHang');
const { SanPham } = require('../../models/SanPham');


// Lấy giỏ hàng theo id account
exports.getGioHangByIdAccount = async (req, res, next) => {
    try {
        const giohang = await GioHang.find({ idAccount: req.params.id });
        if (giohang) {
            return res.json(giohang);
        } else {
            return res.status(400).json({ message: "Không có" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Lấy giỏ hàng theo id giỏ hàng
exports.getGioHangByIdGioHang = async (req, res, next) => {
    try {
        const giohang = await GioHang.findById(req.params.id);
        if (giohang) {
            return res.json(giohang);
        } else {
            return res.status(400).json({ message: "Không có" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addGioHang = async (req, res) => {
    try {
        const { idAccount, idSanPham, soLuong, idBienThe } = req.body;

        // Kiểm tra nếu giỏ hàng đã có sản phẩm đó và biến thể sản phẩm đó thì tăng số lượng
        const existingGH = await GioHang.findOne({ idSanPham, idAccount, idBienThe });
        if (existingGH !== null && existingGH !== undefined) {
            const sanPham = await SanPham.findById(idSanPham).select('bienThe');
            const selectedBienThe = sanPham.bienThe.id(idBienThe);
            if (!selectedBienThe || existingGH.soLuong + soLuong > selectedBienThe.soLuong) {
                return res.status(200).json({ success: false, message: 'Số lượng sản phẩm này trong kho đã đạt tối đa!' });
            }

            existingGH.soLuong += soLuong;
            await existingGH.save();
            return res.status(200).json({ success: true, message: 'Đã thêm vào giỏ hàng!', value: existingGH._id });
        }

        // Nếu chưa có sản phẩm trong giỏ hàng, thêm mới
        const sanPham = await SanPham.findById(idSanPham).select('bienThe soLuong');
        const selectedBienThe = sanPham.bienThe.id(idBienThe);
        if (!selectedBienThe || soLuong > selectedBienThe.soLuong) {
            return res.status(200).json({ success: false, message: 'Số lượng sản phẩm này trong kho đã đạt tối đa!' });
        }

        const newGH = new GioHang({
            idAccount, idSanPham, soLuong, idBienThe,
        });

        await newGH.save();
        return res.status(201).json({ success: true, message: 'Đã thêm vào giỏ hàng!', value: newGH._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Sửa số lượng của sản phẩm trong giỏ hàng
exports.editSoLuongSanPham = async (req, res) => {
    try {
        const {soLuong } = req.body;
        const giohang = await GioHang.findById(req.params.id);
        if (giohang !== null && giohang !== undefined) {
            // Đặt số lượng mới cho sản phẩm trong giỏ hàng
            giohang.soLuong = soLuong;
            await giohang.save();
            return res.status(200).json(giohang);
        } else {
            return res.status(404).json({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
};
// Xóa 
exports.deleteGioHang = async (req, res) => {
    try {
        const giohang = await GioHang.findOneAndDelete({_id: req.params.id});

        if (giohang) {
            return res.status(200).json({ success: true, message: 'Đã xóa giỏ hàng thành công' });
        } else {
            return res.status(404).json({ success: false, message: 'Không tìm thấy giỏ hàng để xóa' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message });
    }
};