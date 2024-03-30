const DonHang = require('../../models/DonDatHang');
const axios = require('axios');
const  {ThongBao}= require('../../models/ThongBao'); 

exports.GetAllDonHang = async (req, res, next) => {
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
        const donHangTheoIdVaTrangThai = await DonHang.find({
            idAccount: idAccount,
            'trangThai': {
                $elemMatch: {
                    'trangThai': trangThai,
                    'isNow': true
                }
            }
        });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.layDonHangChoGiaoHang = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Chờ giao hàng";
        const donHangTheoIdVaTrangThai = await DonHang.find({
            idAccount: idAccount,
            'trangThai': {
                $elemMatch: {
                    'trangThai': trangThai,
                    'isNow': true
                }
            }
        });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.layDonHangDangGiaoHang = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Đang giao hàng";
        const donHangTheoIdVaTrangThai = await DonHang.find({
            idAccount: idAccount,
            'trangThai': {
                $elemMatch: {
                    'trangThai': trangThai,
                    'isNow': true
                }
            }
        });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.layDonHangDaGiaoHang = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Đã giao hàng";
        const donHangTheoIdVaTrangThai = await DonHang.find({
            idAccount: idAccount,
            'trangThai': {
                $elemMatch: {
                    'trangThai': trangThai,
                    'isNow': true
                }
            }
        });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.layDonHangDaHuy = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Đã hủy";
        const donHangTheoIdVaTrangThai = await DonHang.find({
            idAccount: idAccount,
            'trangThai': {
                $elemMatch: {
                    'trangThai': trangThai,
                    'isNow': true
                }
            }
        });

        res.json(donHangTheoIdVaTrangThai);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.addDonHang = async (req, res) => {
    try {
        const { idSanPham, idAccount, idKhuyenMai, soLuong, tongTien, ghiChu, thanhToan,tienShip } = req.body;
        let idKhuyenMaiValue;
        if (idKhuyenMai) {
            idKhuyenMaiValue = idKhuyenMai;
        } else {
            idKhuyenMaiValue = null; // Hoặc gán cho giá trị không xác định nếu phù hợp.
        }
        const newDonHang = new DonHang({
            idSanPham,
            idAccount,
            idKhuyenMaiValue,
            soLuong,
            tongTien,
            ghiChu,
            thanhToan,
            tienShip
        });
        const savedDonHang = await newDonHang.save();
        const tieuDe = 'Đặt hàng thành công';
        const noiDung = 'Bạn đã đặt hàng thành công, vui lòng chờ xác nhận từ cửa hàng nhé!';
        const to = `/topics/${idAccount}`;
        await sendFirebaseNotification(tieuDe, noiDung, to);
        const newThongBao = new ThongBao({
            idDonHang: savedDonHang._id,
            idSanPham:savedDonHang.idSanPham,
            idAccount: savedDonHang.idAccount,
            tieuDe: "Đặt hàng thành công",
            noiDung: "Bạn đã đặt hàng thành công, vui lòng chờ xác nhận từ cửa hàng nhé!",
            daXem: false,
          });
          await newThongBao.save();
        return res.status(201).json(savedDonHang);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.themTrangThai = async (req, res) => {
    try {
        const donHangId = req.params.id;
        const trangThai = req.query.trangThai; 

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
        switch(trangThai) {
            case "Đã giao hàng":
                const tieuDe3 = 'Giao hàng thành công';
                const noiDung3 = 'Đơn hàng đã giao thành công, bạn có thể đánh giá sản phẩm nhé';
                const to3 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe3, noiDung3, to3);
                break;
            case "Đã hủy":
                const tieuDe4 = 'Đơn hàng đã bị hủy';
                const noiDung4 = 'Đơn hàng đã bị hủy bởi bạn, hãy đặt lại đơn hàng khác nhé';
                const to4 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe4, noiDung4, to4);
                break;
            default:
                break;
        }
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
async function sendFirebaseNotification(tieuDe, noiDung, to) {
    const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
    const fcmKey = 'AAAAMC3MiGc:APA91bEjbqnn-hrzh5IVXy4RkirHhZBfCWycV06j3GzS4G7yZ_c_Y8qKtLBpijUFGffFOD58nvU2uTNpFQuO_2spQ6sJXhWeETpst342JSTSVh6HS3XsrCnOvngMSz7x9gLacX2oLrJT';

    const notificationData = {
        data: {
            tieu_de: tieuDe,
            noi_dung: noiDung
        },
        to: to
    };
    try {
        const response = await axios.post(fcmUrl, notificationData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${fcmKey}`
            }
        });

        console.log('Firebase notification sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending Firebase notification:', error.response ? error.response.data : error.message);
        throw error;
    }
}

exports.laySoLuongDonHangDaGiaoHang = async (req, res) => {
    try {
        const idSanPham = req.params.id; // Lấy idSanPham từ request params
        // Tìm các đơn hàng có idSanPham và trạng thái là "Đã giao hàng"
        const soLuongDonHang = await DonHang.countDocuments({
            idSanPham: idSanPham,
            'trangThai': {
                $elemMatch: {
                    'trangThai': 'Đã giao hàng',
                    'isNow': true
                }
            }
        });
        res.json(soLuongDonHang );
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.laySoSaoTrungBinh = async (req, res) => {
    try {
        const idSanPham = req.params.id; // Lấy idSanPham từ request params

        // Tìm tất cả các đánh giá của sản phẩm dựa trên idSanPham
        const danhGiaList = await DonHang.find({ idSanPham: idSanPham }).select('danhGia');

        let tongSoSao = 0;
        let soLuongDanhGia = 0;

        // Lặp qua danh sách đánh giá để tính tổng số sao và số lượng đánh giá
        danhGiaList.forEach(donHang => {
            if (donHang.danhGia && donHang.danhGia.soSao) {
                tongSoSao += donHang.danhGia.soSao;
                soLuongDanhGia++;
            }
        });

        // Tính số sao trung bình
        const soSaoTrungBinh = soLuongDanhGia > 0 ? (tongSoSao / soLuongDanhGia) : 0;

        res.json(soSaoTrungBinh );
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.laySoLanDanhGia = async (req, res) => {
    try {
        const idSanPham = req.params.id;

        const danhGiaList = await DonHang.find({ idSanPham: idSanPham }).select('danhGia');

        let soLuongDanhGia = 0;

        danhGiaList.forEach(donHang => {
            if (donHang.danhGia) {
                soLuongDanhGia++;
            }
        });
        res.json(soLuongDanhGia);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};