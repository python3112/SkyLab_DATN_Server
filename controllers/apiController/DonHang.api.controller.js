const DonHang = require('../../models/DonDatHang');
const axios = require('axios');
const { SanPham } = require('../../models/SanPham');
const  {ThongBao}= require('../../models/ThongBao'); 
const KhuyenMai = require('../../models/KhuyenMai');
const mongoose = require('mongoose');
const nameFolder = 'BaoHanh';
const { uploadImages } = require('../../middlewares/upload.image.firebase');

exports.GetAllDonHang = async (req, res, next) => {
    try {
        const listdonhang = await DonHang.find();
        res.json(listdonhang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getByID = async (req, res) => {
    try {
        const donHang = await DonHang.findById(req.params.id);
        if (!donHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        res.json(donHang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
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
exports.layDonHangTraHang = async (req, res) => {
    try {
        const idAccount = req.params.id;
        const trangThai = "Trả hàng";
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
        const { idSanPham, idBienThe, idAccount, idKhuyenMai, soLuong, tongTien, ghiChu, thanhToan, tienShip } = req.body;
        let idKhuyenMaiValue;
        if (idKhuyenMai) {
            idKhuyenMaiValue = idKhuyenMai;
        } else {
            idKhuyenMaiValue = null;
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Kiểm tra xem biến thể sản phẩm có tồn tại và đủ số lượng không
            const existingBienThe = await SanPham.findById(idSanPham).select('bienThe').session(session);
            const selectedBienThe = existingBienThe.bienThe.id(idBienThe);
            if (!selectedBienThe || selectedBienThe.soLuong < soLuong) {
                return res.status(404).json({ success: false, message: 'Đặt hàng thất bại, số lượng hàng trong kho đã hết' });
            }

            // Update số lượng biến thể sản phẩm trong kho
            selectedBienThe.soLuong -= soLuong;
            await existingBienThe.save();

            // Kiểm tra xem có biến thể nào có số lượng khác 0 không
            let allVariantsEmpty = true;
            for (const variant of existingBienThe.bienThe) {
                if (variant.soLuong > 0) {
                    allVariantsEmpty = false;
                    break;
                }
            }

            // Nếu tất cả các biến thể đều đã hết hàng, đặt trạng thái sản phẩm về false
            if (allVariantsEmpty) {
                const product = await SanPham.findById(idSanPham);
                product.trangThai = false;
                await product.save();
            }

            // Trừ số lượng khuyến mãi (nếu có)
            if (idKhuyenMaiValue) {
                const existingKM = await KhuyenMai.findById(idKhuyenMaiValue).session(session);
                if (existingKM) {
                    existingKM.soLuong -= 1;
                    if (existingKM.soLuong === 0) {
                        existingKM.trangThai = false;
                    }
                    await existingKM.save();
                }
            }

            // Tạo và lưu đơn hàng mới
            const newDonHang = new DonHang({
                idSanPham,
                idAccount,
                idKhuyenMai: idKhuyenMaiValue,
                soLuong,
                tongTien,
                ghiChu,
                thanhToan,
                tienShip,
                idBienThe
            });
            const savedDonHang = await newDonHang.save();

            await session.commitTransaction();
            session.endSession();

            // Gửi thông báo thành công và phản hồi
            const tieuDe = 'Đặt hàng thành công';
            const noiDung = 'Bạn đã đặt hàng thành công, vui lòng chờ xác nhận từ cửa hàng nhé!';
            const to = `/topics/${idAccount}`;
            await sendFirebaseNotification(tieuDe, noiDung, to);

            const newThongBao = new ThongBao({
                idDonHang: savedDonHang._id,
                idSanPham: savedDonHang.idSanPham,
                idAccount: savedDonHang.idAccount,
                tieuDe: "Đặt hàng thành công",
                noiDung: "Bạn đã đặt hàng thành công, vui lòng chờ xác nhận từ cửa hàng nhé!",
                daXem: false,
            });
            await newThongBao.save();

            return res.status(201).json({ success: true, message: 'Đặt hàng thành công' });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
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

        // Nếu trạng thái mới là "Đã hủy", thêm lại số lượng sản phẩm vào kho
        if (trangThai == "Đã hủy") {
            const existingBienThe = await SanPham.findById(donHang.idSanPham).select('bienThe');
            const product = await SanPham.findById(donHang.idSanPham);
            const selectedBienThe = existingBienThe.bienThe.id(donHang.idBienThe);
            selectedBienThe.soLuong += donHang.soLuong;
            product.trangThai = true;
            await product.save();
            await existingBienThe.save();
        }

        await donHang.save();

        switch (trangThai) {
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
        console.log(error);
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
        const donHangs = await DonHang.find({
            idSanPham: idSanPham,
            'trangThai': {
                $elemMatch: {
                    'trangThai': 'Đã giao hàng',
                    'isNow': true
                }
            }
        });

        let tongSoSanPham = 0;

        // Lặp qua từng đơn hàng đã giao để tính tổng số sản phẩm
        donHangs.forEach(donHang => {
            tongSoSanPham += donHang.soLuong;
        });

        res.json(tongSoSanPham);
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
exports.updateBaoHanh = async (req, res) => {
    try {
        const { lyDo, tinhTrang } = req.body;
        const idDH = req.params.iddh;
        const idBH = req.params.idbh;
        let imageUrlAnh =[];
        let files = req.files;
        if (files) {
            imageUrlAnh = await uploadImages(files, nameFolder);
        }
        // Kiểm tra xem đơn hàng có tồn tại không
        const donHang = await DonHang.findById(idDH);

        if (!donHang) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
        }

        // Tìm và cập nhật thông tin bảo hành
        const baoHanh = donHang.baoHanh.id(idBH);
        if (!baoHanh) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin bảo hành' });
        }

        if (imageUrlAnh) {
            baoHanh.anh = imageUrlAnh;
        }
        if (lyDo) {
            baoHanh.lyDo = lyDo;
        }
        if (tinhTrang !== undefined) {
            baoHanh.tinhTrang = tinhTrang;
        }
        await donHang.save();

        res.json({ success: true, message: 'Cập nhật thông tin bảo hành thành công' });
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

exports.laySoLuongDonHangChoXacNhan = async (req, res) => {
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

        res.json(donHangTheoIdVaTrangThai.length);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.laySoLuongDonHangChoGiaoHang = async (req, res) => {
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

        res.json(donHangTheoIdVaTrangThai.length);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.laySoLuongDonHangDangGiaoHang = async (req, res) => {
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

        res.json(donHangTheoIdVaTrangThai.length);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBaoHanhByIdAccount = async (req, res, next) => {
    try {
        const idAccount = req.params.id; // Lấy idAccount từ URL

        // Tìm các đơn hàng có chứa thông tin bảo hành của idAccount
        const donHangs = await DonHang.find({ "baoHanh.idAccount": idAccount }).lean();

        if (!donHangs) {
            return res.status(404).json({ message: "Không tìm thấy bảo hành cho tài khoản này" });
        }

        // Lọc ra thông tin bảo hành từ các đơn hàng
        const listBaoHanh = donHangs.reduce((acc, curr) => {
            curr.baoHanh.forEach(baoHanh => {
                if (baoHanh.idAccount.toString() === idAccount && baoHanh.tinhTrang != 0) {
                    acc.push(baoHanh);
                }
            });
            return acc;
        }, []);

        // Trả về danh sách các bảo hành
        res.status(200).json(listBaoHanh);
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ message: error.message });
    }
}
exports.getBaoHanhByIdBaoHanh = async (req, res, next) => {
    try {
        const idBaoHanh = req.params.id; // Lấy idBaoHanh từ URL

        // Tìm đơn hàng chứa thông tin bảo hành có idBaoHanh
        const donHang = await DonHang.findOne({ "baoHanh._id": idBaoHanh }).lean();

        if (!donHang) {
            return res.status(404).json({ message: "Không tìm thấy thông tin bảo hành với ID này" });
        }

        // Tìm thông tin bảo hành trong đơn hàng
        const baoHanh = donHang.baoHanh.find(bh => bh._id.toString() === idBaoHanh);

        if (!baoHanh) {
            return res.status(404).json({ message: "Không tìm thấy thông tin bảo hành với ID này" });
        }

        // Trả về thông tin bảo hành
        res.status(200).json(baoHanh);
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ message: error.message });
    }
};
