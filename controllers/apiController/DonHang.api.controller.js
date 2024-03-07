const DonHang = require('../../models/DonDatHang');

exports.GetAllDonHang = async(req , res , next) =>{
        try {
            const listdonhang = await DonHang.find();
            res.json(listdonhang);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
   
}


exports.addDonHang = async (req, res) => {
    try {
        const { idSanPham, idAccount, idKhuyenMai,soLuong, tongTien, ghiChu } = req.body;

        const newDonHang = new DonHang({
            idSanPham,
            idAccount,
            idKhuyenMai,
            soLuong,
            tongTien,
            ghiChu,
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

        const newDH = { trangThai };
        donHang.trangThai.push(newDH);
        await donHang.save();

        res.json({ success: true, message: 'Thêm trạng thái thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
