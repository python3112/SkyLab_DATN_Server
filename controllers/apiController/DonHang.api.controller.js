const DonHang = require('../../models/DonDatHang');

exports.GetAllDonHang = async(req , res , next) =>{
        try {
            const listdonhang = await DonHang.find();
            res.json(listdonhang);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
   
}

exports.layDonHangChoXacNhan = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Chờ xác nhận";
        const donHangTheoIdVaTrangThai = await DonHang.find({ idAccount: idAccount, 'trangThai.trangThai': trangThai });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.layDonHangChoGiaoHang = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Chờ giao hàng";
        const donHangTheoIdVaTrangThai = await DonHang.find({ idAccount: idAccount, 'trangThai.trangThai': trangThai });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.layDonHangDaGiaoHang = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Đã giao hàng";
        const donHangTheoIdVaTrangThai = await DonHang.find({ idAccount: idAccount, 'trangThai.trangThai': trangThai });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.layDonHangDaHuy = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Đã hủy";
        const donHangTheoIdVaTrangThai = await DonHang.find({ idAccount: idAccount, 'trangThai.trangThai': trangThai });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.addDonHang = async (req, res) => {
    try {
        const { idSanPham, idAccount, idKhuyenMai,soLuong, tongTien, ghiChu,thanhToan } = req.body;

        const newDonHang = new DonHang({
            idSanPham,
            idAccount,
            idKhuyenMai,
            soLuong,
            tongTien,
            ghiChu,
            thanhToan
        });
        const savedDonHang = await newDonHang.save();

        return res.status(201).json(savedDonHang);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.themTrangThai = async (req, res) => {
    try {
        const donHangId = req.params.id;
        const { trangThai } = req.body;

        const donHang = await DonHang.findById(donHangId);

        if (!donHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        // Kiểm tra xem trạng thái đã tồn tại hay chưa
        const trangThaiDaTonTai = donHang.trangThai.some(item => item.trangThai === trangThai);
        if (trangThaiDaTonTai) {
            return res.status(400).json({ message: 'Trạng thái đã tồn tại trong đơn hàng' });
        }

        // Sửa đổi thuộc tính isNow của trạng thái hiện tại thành false (nếu có)
        const trangThaiHienTai = donHang.trangThai.find(item => item.isNow === true);
        if (trangThaiHienTai) {
            trangThaiHienTai.isNow = false;
        }

        // Thêm trạng thái mới
        const newDH = { trangThai, isNow: true };
        donHang.trangThai.push(newDH);
        await donHang.save();

        res.json({ success: true, message: 'Thêm trạng thái thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.editThanhToan = async (req, res) => {
    try {
        const donHangId = req.params.id;
        const { thanhToan } = req.body;

        const donHang = await DonHang.findById(donHangId);

        if (!donHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        // Cập nhật giá trị thanhToan của đơn hàng
        donHang.thanhToan = thanhToan;
        await donHang.save();

        res.json({ success: true, message: 'Chỉnh sửa thanh toán thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};