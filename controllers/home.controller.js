const DonHang = require('../models/DonDatHang');
const MAccount = require('../models/Account')
const { SanPham } = require('../models/SanPham');
const MHang = require('../models/Hangsx')
const MKhuyenMai = require('../models/KhuyenMai')
exports.home =  async (req,res,next)=>{
     user = req.session.Account;
     const listAcount = [];
     const listDoanhThu = [];
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
                        $gte: new Date(year, month, day, 0, 0, 0, 0),
                        $lt: new Date(year, month, day, 23, 59, 59, 999)
                    }
                }
            }
        };
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
        const tongDoanhThu = resultDonHang.length > 0 ? resultDonHang[0].tongDoanhThu : 0;
        const soLuongDonHang = resultDonHang.length > 0 ? resultDonHang[0].soLuongDonHang : 0;
        const soLuongThanhVien = ThanhVien.length > 0 ? ThanhVien[0].soLuong : 0;
        const soLuongKM = KhuyenMai.length > 0 ? KhuyenMai[0].soLuong : 0;
        const soLuongHang = Hang.length > 0 ? Hang[0].soLuong : 0;
        const soLuongSp = SLSP.length > 0 ? SLSP[0].soLuong : 0;
        // Gửi kết quả về client để xử lý trong front-end
        // res.send(SLSP);
    
       // Hoặc render trang và truyền dữ liệu vào đó
        res.render('home/home', {
            user: req.session.Account,
            title: "Trang chủ",
            tongDoanhThu: tongDoanhThu,
            soLuongDonHang:soLuongDonHang,
            soLuongThanhVien:soLuongThanhVien,
            soLuongKM: soLuongKM,
            soLuongHang:soLuongHang,
            soLuongSp:soLuongSp
        });
    
    } catch (error) {
        // Ghi log lỗi ra console
        console.error('Error occurred:', error);
        // Gửi thông báo lỗi về client
        res.status(500).send(error.message || 'Internal Server Error');
    }
    
}

