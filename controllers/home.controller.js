const DonHang = require('../models/DonDatHang');
const MAccount = require('../models/Account')
const { SanPham } = require('../models/SanPham');
const MHang = require('../models/Hangsx')
const MKhuyenMai = require('../models/KhuyenMai');
const { LoadBundleTask } = require('firebase/firestore');
exports.home =  async (req,res,next)=>{
     user = req.session.Account;
     const year = new Date().getFullYear(); // Lấy năm hiện tại
     try {
        // Tạo ngày bắt đầu và ngày kết thúc của ngày hiện tại
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();
        let startOfDay = new Date(year, month, day, 0, 0, 0, 0);
        let endOfDay = new Date(year, month, day, 23, 59, 59, 999);
        // Tạo bộ lọc cho đơn hàng trong ngày hiện tại
        const filterDonHang = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            }
        };
        async function filterDonHangSl(trangThai, year, monthS, monthE, dayS, dayE) {
            try {
                const filter = {
                    "trangThai": {
                        $elemMatch: {
                            "trangThai": trangThai,
                            "thoiGian": {
                                $gte: new Date(year, monthS - 1, dayS),
                                $lt: new Date(year, monthE-1, dayE)
                            },
                            isNow : true
                        }
                    },
                    
                };
        
                const result = await DonHang.aggregate([
                    { $match: filter },
                    {
                        $group: {
                            _id: null,
                            soLuongDonHang: { $sum: 1 }
                        }
                    }
                ]);
        
                const soLuong = result.length > 0 ? result[0].soLuongDonHang : 0;
                return soLuong; // Trả về giá trị soLuong
            } catch (error) {
                console.error("Lỗi trong quá trình xử lý yêu cầu: ", error);
                throw new Error("Đã xảy ra lỗi trong quá trình xử lý yêu cầu.");
            }
        }
        // fillter trong ngay 
        async function filterDonHangTrongNgay(trangThai) {
            const date = new Date();
            const year = date.getFullYear();
            const day = date.getDate();
            const month = date.getMonth();
            const startFillter = new Date(year, month ,day,0,0,0,0)
            const endFillter = new Date(year, month ,day,23,59,59,999)
            try {
                const filter = {
                    "trangThai": {
                        $elemMatch: {
                            "trangThai": trangThai,
                            "thoiGian": {
                                $gte: startFillter,
                                $lt: endFillter
                            },
                            isNow : true
                        }
                    },
                    
                };
        
                const result = await DonHang.aggregate([
                    { $match: filter },
                    {
                        $group: {
                            _id: null,
                            soLuongDonHang: { $sum: 1 }
                        }
                    }
                ]);
        
                const soLuong = result.length > 0 ? result[0].soLuongDonHang : 0;
                return soLuong; // Trả về giá trị soLuong
            } catch (error) {
                console.error("Lỗi trong quá trình xử lý yêu cầu: ", error);
                throw new Error("Đã xảy ra lỗi trong quá trình xử lý yêu cầu.");
            }
        }
        const filterTongDoanhThu = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: new Date(year, 0, 0),
                        $lt: new Date(year, 12, 31)
                    },
                }
            }
        }
        const resultDonHang = await DonHang.aggregate([
            { $match: filterDonHang }, // Sử dụng bộ lọc cho đơn hàng trong ngày hiện tại
            {
                $group: {
                    _id: null,
                    tongDoanhThu: { $sum: "$tongTien" },
                    soLuongDonHang: { $sum: 1 }
                }
            }
        ]);
        const resultDoanhThuNam = await DonHang.aggregate([
            { $match: filterTongDoanhThu }, // Sử dụng bộ lọc cho đơn hàng trong ngày hiện tại
            {
                $group: {
                    _id: null,
                    tongDoanhThu: { $sum: "$tongTien" },
                    soLuongDonHang: { $sum: 1 }
                }
            }
        ]);
        
        const ThanhVien = await MAccount.aggregate([
            {
        
            $group: {
                _id: null,
                soLuong: { $sum: 1 }
            }
            }
        ]
        )
        const SLSP = await SanPham.aggregate([
            {
        
                $group: {
                    _id: null,
                    soLuong: { $sum: 1 }
                }
                }
        ]
           
        )
        const Hang = await MHang.aggregate([
            {
        
                $group: {
                    _id: null,
                    soLuong: { $sum: 1 }
                }
                }
        ]
        )
        const KhuyenMai = await MKhuyenMai.aggregate([
            {
        
                $group: {
                    _id: null,
                    soLuong: { $sum: 1 }
                }
                }
        ] 
        ) 
        const resultDoanhUserNew = await MAccount.aggregate([
            {
                $match: {
                    thoiGian: {
                        $gte: startOfDay,
                        $lt: endOfDay
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    soLuong: { $sum: 1 }
                }
            }
        ]);
        
        
        
        const tongDoanhThu = resultDonHang.length > 0 ? resultDonHang[0].tongDoanhThu : 0;
        const soLuongThanhVien = ThanhVien.length > 0 ? ThanhVien[0].soLuong : 0;
        const soLuongKM = KhuyenMai.length > 0 ? KhuyenMai[0].soLuong : 0;
        const soLuongHang = Hang.length > 0 ? Hang[0].soLuong : 0;
        const soLuongSp = SLSP.length > 0 ? SLSP[0].soLuong : 0;
        const tongDoanhThuNam = resultDoanhThuNam.length > 0 ? resultDoanhThuNam[0].tongDoanhThu : 0;
        const soLuongAcountNew = resultDoanhUserNew.length > 0 ? resultDoanhUserNew[0].soLuong : 0;
        // Gửi kết quả về client để xử lý trong front-end

       // Hoặc render trang và truyền dữ liệu vào đó
        res.render('home/home', {
            user: req.session.Account,
            title: "Trang chủ",
            tongDoanhThu: tongDoanhThu,
            soLuongThanhVien:soLuongThanhVien,
            soLuongKM: soLuongKM,
            soLuongHang:soLuongHang,
            soLuongSp:soLuongSp,
            tongDoanhThuNam:tongDoanhThuNam,
            choXacNhan: await filterDonHangSl("Chờ xác nhận", year, "1" ,"12", "1", "31"),
            choGiao: await filterDonHangSl("Chờ giao hàng", year, "1" ,"12", "1", "31"),
            dangGiao: await filterDonHangSl("Đang giao hàng", year, "1" ,"12", "1", "31"),
            daGiao: await filterDonHangSl("Đã giao hàng", year, "1" ,"12", "1", "31"),
            daHuy: await filterDonHangSl("Đã hủy",  year, "1" ,"12", "1", "31"),
            choXacNhanHomNay: await filterDonHangTrongNgay("Chờ xác nhận"),
            giaoThanhCongHomNay: await filterDonHangTrongNgay("Đã giao hàng"),
            ChoGiaoHomNay: await filterDonHangTrongNgay("Chờ giao hàng"),
            daHuyHomNay: await filterDonHangTrongNgay("Đã hủy"),
            DangGiaoHomNay: await filterDonHangTrongNgay("Đang giao hàng"),
            nguoiDungMoi : soLuongAcountNew,
            year: year,
            month: month,
            day: day
        });
    
    } catch (error) {
        // Ghi log lỗi ra console
        console.error('Error occurred:', error);
        // Gửi thông báo lỗi về client
        res.status(500).send(error.message || 'Internal Server Error');
    }
    
}

