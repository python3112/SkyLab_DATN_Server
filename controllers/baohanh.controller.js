const DonHang = require('../models/DonDatHang');
const Account = require('../models/Account');
const { SanPham } = require('../models/SanPham');
const axios = require('axios');

exports.home = async (req, res, next) => {
    try {
        const user = req.session.Account;
        let listDonHang;
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;
        const skip = (page - 1) * perPage;
        let filter = {};

        // Lọc các bảo hành có tình trạng khác 0
        filter["baoHanh"] = { $elemMatch: { "tinhTrang": { $ne: 0 } } };

        // Thêm điều kiện lọc theo trạng thái nếu được truyền vào
        if (req.query.status && req.query.status !== "0") {
            filter["baoHanh.tinhTrang"] = req.query.status;
        }

        const totalFilteredDonHang = await DonHang.countDocuments(filter);
        const totalPages = Math.ceil(totalFilteredDonHang / perPage);

        listDonHang = await DonHang.find(filter).skip(skip).limit(perPage);

        const sttStart = (page - 1) * perPage + 1;

        const listSanPham = [];
        const listAccount = [];
        const listBaoHanh = [];

        for (const donhang of listDonHang) {
            const sanPham = await SanPham.findById(donhang.idSanPham);
            const account = await Account.findById(donhang.idAccount);
            if (sanPham) {
                listSanPham.push(sanPham);
            }
            if (account) {
                listAccount.push(account);
            }
            for (let index = 0; index < donhang.baoHanh.length; index++) {
                if (donhang.baoHanh[index].tinhTrang != 0) {
                    listBaoHanh.push(donhang.baoHanh[index]);
                }
            }

        }
        res.render('baohanh/home_baohanh', {
            title: "Quản lý bảo hàng",
            sttStart: sttStart,
            totalPages: totalPages,
            currentPage: page,
            listAccount: listAccount,
            listSanPham: listSanPham,
            listBaoHanh: listBaoHanh,
            status: req.query.status,
            user: user // Chuyển thêm tham số trạng thái để giữ trạng thái khi chuyển trang
        });
    }
    catch (error) {
        res.render("Error/err", { msg: error });
    }
}

exports.chitiet = async (req, res, next) => {
    try {
        const user = req.session.Account;
        const idBaoHanh = req.params.id; // Giả sử idBaoHanh là một phần của URL, ví dụ /chitiet/:idBaoHanh
        const donHang = await DonHang.findOne({ "baoHanh._id": idBaoHanh }).lean(); // Tìm đơn hàng với idBaoHanh tương ứng
        if (!donHang) {
            // Nếu không tìm thấy đơn hàng, có thể render một trang thông báo lỗi
            return res.render('baohanh/error', { message: 'Không tìm thấy đơn hàng' });
        }
        // Lấy thông tin bảo hành từ đơn hàng
        const baoHanh = donHang.baoHanh.find(item => item._id.toString() === idBaoHanh);
        if (!baoHanh) {
            // Nếu không tìm thấy thông tin bảo hành, có thể render một trang thông báo lỗi
            return res.render('baohanh/error', { message: 'Không tìm thấy thông tin bảo hành' });
        }
        // Tìm sản phẩm và tài khoản liên quan đến đơn hàng
        const sanPham = await SanPham.findById(baoHanh.idSanPham);
        const account = await Account.findById(baoHanh.idAccount);

        // Kiểm tra xem sản phẩm và tài khoản có tồn tại không
        if (!sanPham) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        if (!account) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" });
        }
        // Render trang chi tiết bảo hành với thông tin đã tìm được
        res.render('baohanh/chitiet_baohanh', {
            title: "Chi tiết bảo hàng",
            user: user,
            baoHanh: baoHanh,
            sanPham: sanPham, 
            account: account,
        });
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ message: error.message });
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const idBaoHanh = req.params.id; // Lấy idBaoHanh từ URL
        const newStatus = req.query.status; // Lấy trạng thái mới từ truy vấn

        // Kiểm tra xem trạng thái mới có hợp lệ không
        if (!["2", "3"].includes(newStatus)) {
            return res.status(400).json({ message: "Trạng thái không hợp lệ" });
        }

        // Tìm và cập nhật bảo hành trong đơn hàng
        const donHang = await DonHang.findOneAndUpdate(
            { "baoHanh._id": idBaoHanh },
            { $set: { "baoHanh.$.tinhTrang": parseInt(newStatus) } },
            { new: true }
        );

        if (!donHang) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        // Trả về thông tin cập nhật
        res.redirect(`/bao-hanh/chi-tiet/${idBaoHanh}`);
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ message: error.message });
    }
}

