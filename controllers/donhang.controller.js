const DonHang = require('../models/DonDatHang');
const {SanPham} = require('../models/SanPham'); 
const Account = require('../models/Account'); 
const axios = require('axios');

exports.home = async (req, res, next) => {
    try {
        const listdonhang = await DonHang.find();
        const listSanPham = [];
        const listAccount = [];

        for (const donhang of listdonhang) {
            const sanPham = await SanPham.findById(donhang.idSanPham);
            const account = await Account.findById(donhang.idAccount);
            if (sanPham) {
                listSanPham.push(sanPham);
            }
            if (account) {
                listAccount.push(account);
            }
        }

        res.render('donhang/home_donhang', { title: "Quản lý đơn hàng", listDonHang: listdonhang, listSanPham: listSanPham,listAccount:listAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.chitiet = async (req, res, next) => {
    try {
        // Lấy idDonhang từ request
        const id = req.params.id; // Giả sử idDonhang được truyền vào qua route params

        // Tìm đơn hàng theo idDonhang
        const donhang = await DonHang.findById(id);
        const ttNow = donhang.trangThai.find(tt=> tt.isNow == true);
        if (!donhang) {
            return res.status(404).json({ message: "Đơn hàng không tồn tại" });
        }

        // Tìm sản phẩm và tài khoản liên quan đến đơn hàng
        const sanPham = await SanPham.findById(donhang.idSanPham);
        const account = await Account.findById(donhang.idAccount);

        // Kiểm tra xem sản phẩm và tài khoản có tồn tại không
        if (!sanPham) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        if (!account) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" });
        }

        // Render trang với thông tin đơn hàng, sản phẩm và tài khoản
        res.render('donhang/chitiet_donhang', { title: "Thông tin đơn hàng", donhang: donhang, sanPham: sanPham, account: account,ttNow:ttNow });
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: error.message });
    }
}

exports.themTrangThaiPost = async (req, res) => {
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
            case "Chờ giao hàng":
                const tieuDe1 = 'Đơn hàng đang chờ giao';
                const noiDung1 = 'Đơn hàng của bạn hiện đang chờ giao, vui lòng kiên nhẫn đợi.';
                const to1 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe1, noiDung1, to1);
                break;
            case "Đang giao hàng":
                const tieuDe2 = 'Đang giao hàng';
                const noiDung2 = 'Đơn hàng của bạn đang được giao, vui lòng kiên nhẫn đợi.';
                const to2 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe2, noiDung2, to2);
                break;
            case "Đã hủy":
                const tieuDe4 = 'Đơn hàng đã bị hủy';
                const noiDung4 = 'Đơn hàng đã bị hủy bởi shop, hãy đặt lại đơn hàng khác nhé';
                const to4 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe4, noiDung4, to4);
                break;
            default:
                // Xử lý trường hợp mặc định nếu trạng thái không khớp với bất kỳ trường hợp nào
                break;
        }
        // Redirect lại trang chi tiết đơn hàng
        res.redirect(`/don-hang/chi-tiet/${donHangId}`);
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
