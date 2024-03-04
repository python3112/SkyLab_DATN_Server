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

exports.addGioHang = async (req, res) => {
    try {
        const { idAccount, idSanPham, soLuong } = req.body;

        // Kiểm tra nếu giỏ hàng đã có sản phẩm đó thì tăng số lượng
        const existingGH = await GioHang.findOne({ idSanPham: idSanPham, idAccount: idAccount });
        const sanPham = await SanPham.findById(idSanPham);
        let soLuongSP = sanPham.soLuong;
        if (existingGH !== null && existingGH !== undefined) {
            let sl = existingGH.soLuong;
            if (sl == soLuongSP) {
                return res.status(200).json({ success: false, message: 'Số lượng sản phẩm này trong giỏ hàng đã đạt tối đa!' });
            }

            existingGH.soLuong = sl + soLuong;
            if (existingGH.soLuong > soLuongSP) {
                let slAdd = soLuongSP - sl;
                return res.status(200).json({ success: false, message: 'Bạn chỉ được thêm ' + slAdd + ' sản phẩm nữa!' });
            }
            await existingGH.save();
            return res.status(200).json({ success: true, message: 'Đã thêm vào giỏ hàng!',value: existingGH._id  });
        }

        // Nếu chưa có sản phẩm trong giỏ hàng, thêm mới
        const newGH = new GioHang({
            idAccount, idSanPham, soLuong,
        });

        await newGH.save();
        return res.status(201).json({ success: true, message: 'Đã thêm vào giỏ hàng!',value: newGH._id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Sửa số lượng của sản phẩm trong giỏ hàng
exports.editSoLuongSanPham = async (req, res) => {
    try {
        const { idAccount, idSanPham, soLuong } = req.body;

        // Kiểm tra xem idAccount, idSanPham và soLuong có tồn tại hay không
        if (!idAccount || !idSanPham || soLuong === undefined) {
            return res.status(400).json({ error: 'BAD_REQUEST', message: 'Missing idAccount, idSanPham, or soLuong in request body' });
        }

        // Kiểm tra nếu giỏ hàng có sản phẩm đó thì sửa số lượng
        const existingGH = await GioHang.findOne({ idSanPham: idSanPham, idAccount: idAccount });

        if (existingGH !== null && existingGH !== undefined) {
            // Đặt số lượng mới cho sản phẩm trong giỏ hàng
            existingGH.soLuong = soLuong;
            await existingGH.save();
            return res.status(200).json(existingGH);
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
        const { idAccount, idSanPham } = req.body;

        // Kiểm tra xem idAccount và idSanPham có tồn tại hay không
        if (!idAccount || !idSanPham) {
            return res.status(400).json({ error: 'BAD_REQUEST', message: 'Missing idAccount or idSanPham in request body' });
        }
        // Kiểm tra nếu giỏ hàng có sản phẩm đó thì xóa sản phẩm
        const result = await GioHang.deleteOne({ idSanPham: idSanPham, idAccount: idAccount });

        if (result.deletedCount > 0) {
            return res.status(200).json({ messsage: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
        } else {
            return res.status(404).json({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
};