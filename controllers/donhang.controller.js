const DonHang = require('../models/DonDatHang');
const {BaoHanh} = require('../models/DonDatHang');
const { SanPham } = require('../models/SanPham');
const Account = require('../models/Account');
const { ThongBao } = require('../models/ThongBao');
const axios = require('axios');

exports.home = async (req, res, next) => {
    try {
        const user = req.session.Account;
        let listDonHang;
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const skip = (page - 1) * perPage;

        // Khởi tạo filter object để lọc
        let filter = {};
        if (req.query.status && req.query.status !== "Tất cả") {
            // Nếu có trạng thái được chọn và không phải là "Tất cả", thêm điều kiện lọc vào filter
            filter = {
                "trangThai": {
                    $elemMatch: { // Tìm các phần tử trong mảng trạng thái thỏa mãn các điều kiện sau:
                        "trangThai": req.query.status, // Trạng thái phải là trạng thái được truyền vào
                        "isNow": true // Và trạng thái isNow phải là true
                    }
                }
            };
        }

        // Lấy số lượng đơn hàng đã lọc
        const totalFilteredDonHang = await DonHang.countDocuments(filter);
        const totalPages = Math.ceil(totalFilteredDonHang / perPage);

        listDonHang = await DonHang.find(filter).skip(skip).limit(perPage);

        // Sắp xếp lại mảng listDonHang theo thời gian của trạng thái isNow gần nhất
        listDonHang.sort((a, b) => {
            const timeA = a.trangThai.find(tt => tt.isNow)?.thoiGian || 0;
            const timeB = b.trangThai.find(tt => tt.isNow)?.thoiGian || 0;
            return new Date(timeB) - new Date(timeA);
        });

        const sttStart = (page - 1) * perPage + 1;

        const listSanPham = [];
        const listAccount = [];

        for (const donhang of listDonHang) {
            const sanPham = await SanPham.findById(donhang.idSanPham);
            const account = await Account.findById(donhang.idAccount);
            if (sanPham) {
                listSanPham.push(sanPham);
            }
            if (account) {
                listAccount.push(account);
            }
        }

        res.render('donhang/home_donhang', {
            title: "Quản lý đơn hàng",
            sttStart: sttStart,
            totalPages: totalPages,
            currentPage: page,
            listDonHang: listDonHang,
            listSanPham: listSanPham,
            listAccount: listAccount,
            status: req.query.status,
            user: user // Chuyển thêm tham số trạng thái để giữ trạng thái khi chuyển trang
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.chitiet = async (req, res, next) => {
    try {
        // Lấy idDonhang từ request
        const id = req.params.id; // Giả sử idDonhang được truyền vào qua route params
        const user = req.session.Account;

        // Tìm đơn hàng theo idDonhang
        const donhang = await DonHang.findById(id);
        const ttNow = donhang.trangThai.find(tt => tt.isNow == true);
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
        res.render('donhang/chitiet_donhang', { title: "Thông tin đơn hàng", donhang: donhang, sanPham: sanPham, account: account, ttNow: ttNow, user: user });
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
        switch (trangThai) {
            case "Chờ giao hàng":
                for (let i = 0; i < donHang.soLuong; i++) {
                    const imei = req.body[`imei_${i}`];
                    const idSP = donHang.idSanPham;
                    const idAC = donHang.idAccount;
                    const idDH = donHang._id;
                    const newBH = {idDonDatHang:idDH,idSanPham:idSP,idAccount:idAC, imei, tinhTrang: 0 };
                    donHang.baoHanh.push(newBH);
                }
                await donHang.save();
                const tieuDe1 = 'Đơn hàng đang chờ giao';
                const noiDung1 = 'Đơn hàng của bạn hiện đang chờ giao, vui lòng kiên nhẫn đợi.';
                const to1 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe1, noiDung1, to1);
                const newThongBao = new ThongBao({
                    idDonHang: donHang._id,
                    idSanPham: donHang.idSanPham,
                    idAccount: donHang.idAccount,
                    tieuDe: "Đơn hàng đang chờ giao",
                    noiDung: "Đơn hàng của bạn hiện đang chờ giao, vui lòng kiên nhẫn đợi nhé!",
                    daXem: false,
                });
                await newThongBao.save();
                break;
            case "Đang giao hàng":
                const tieuDe2 = 'Đơn hàng đang được giao';
                const noiDung2 = 'Đơn hàng của bạn đang được giao, vui lòng kiên nhẫn đợi nhé!';
                const to2 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe2, noiDung2, to2);
                const newThongBao2 = new ThongBao({
                    idDonHang: donHang._id,
                    idSanPham: donHang.idSanPham,
                    idAccount: donHang.idAccount,
                    tieuDe: "Đơn hàng đang được giao",
                    noiDung: "Đơn hàng của bạn đang được giao, vui lòng kiên nhẫn đợi nhé!",
                    daXem: false,
                });
                await newThongBao2.save();
                break;
            case "Đã hủy":
                const tieuDe4 = 'Đơn hàng đã bị hủy';
                const noiDung4 = 'Đơn hàng đã bị hủy bởi shop, hãy đặt lại đơn hàng khác nhé!';
                const to4 = `/topics/${donHang.idAccount}`;
                await sendFirebaseNotification(tieuDe4, noiDung4, to4);
                const newThongBao3 = new ThongBao({
                    idDonHang: donHang._id,
                    idSanPham: donHang.idSanPham,
                    idAccount: donHang.idAccount,
                    tieuDe: "Đơn hàng đã bị hủy",
                    noiDung: "Đơn hàng đã bị hủy bởi shop, hãy đặt lại đơn hàng khác nhé",
                    daXem: false,
                });
                await newThongBao3.save();
                break;
            default:
                break;
        }
        // Redirect lại trang chi tiết đơn hàng
        res.redirect(`/don-hang/chi-tiet/${donHangId}`);
    } catch (error) {
        console.log(error.message);
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
