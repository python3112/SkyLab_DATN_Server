const DonHang = require('../models/DonDatHang');
const {SanPham} = require('../models/SanPham')
exports.home = (req, res, next) => {
    const user = req.session.Account;
    res.render('thongke/home_thongke', { title: "Thống kê", user: user });
}
exports.doanhThu = async (req, res, next) => {
    let year = new Date().getFullYear(); // Lấy năm hiện tại
    let monthlyRevenue = []; // Mảng chứa tổng doanh thu hàng tháng

    // Lặp qua từ tháng 1 đến tháng 12
    for (let month = 1; month <= 12; month++) {
        // Tạo ngày đầu tiên và ngày cuối cùng của tháng
        let firstDayOfMonth = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
        let lastDayOfMonth = new Date(year, month, 0); // Ngày cuối cùng của tháng

        // Tạo bộ lọc cho tháng hiện tại
        let filter = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: firstDayOfMonth,
                        $lt: lastDayOfMonth
                    },
                    "isNow": true
                }
            }
        };

        // Thực hiện aggregation để tính tổng doanh thu cho tháng hiện tại
        let result = await DonHang.aggregate([
            {
                $match: filter // Sử dụng bộ lọc cho tháng hiện tại
            },
            {
                $group: {
                    _id: null, // Tính tổng doanh thu của tất cả các đơn hàng trong tháng
                    tongDoanhThu: { $sum: "$tongTien" }
                }
            }
        ]);

        // Lưu tổng doanh thu của tháng hiện tại vào mảng monthlyRevenue
        monthlyRevenue.push(result.length > 0 ? result[0].tongDoanhThu : 0);
    }

    // Tạo bộ lọc cho các đơn hàng với thanhToan là true
    let filterThanhToanTrue = {
        "trangThai": {
            $elemMatch: {
                "trangThai": "Đã giao hàng"
            }
        },
        "thanhToan": true // Chỉ lấy các đơn hàng có thanhToan là true
    };


    // Thực hiện aggregation để tính tổng doanh thu cho các đơn hàng có thanhToan là true
    let resultThanhToanTrue = await DonHang.aggregate([
        {
            $match: filterThanhToanTrue // Sử dụng bộ lọc cho các đơn hàng có thanhToan là true
        },
        {
            $group: {
                _id: null, // Tính tổng doanh thu của tất cả các đơn hàng có thanhToan là true
                tongDoanhThu: { $sum: "$tongTien" }
            }
        }
    ]);


    // Lấy tổng doanh thu của các đơn hàng có thanhToan là true và false riêng biệt
    const tongDoanhThuTrue = resultThanhToanTrue.length > 0 ? resultThanhToanTrue[0].tongDoanhThu : 0;

    // Gửi mảng tổng doanh thu của từng tháng cùng với các tổng doanh thu riêng biệt
    const user = req.session.Account;
    res.render('thongke/doanhthu', {
        title: "Thống kê doanh thu",
        user: user,
        data: monthlyRevenue,
        year: year,
        tongDoanhThuTrue: tongDoanhThuTrue,
    });
}
exports.doanhThuTheoNam = async (req, res, next) => {
    const paramY = req.params.year;
    let year = parseInt(paramY);
    let monthlyRevenue = []; // Mảng chứa tổng doanh thu hàng tháng

    // Lặp qua từ tháng 1 đến tháng 12
    for (let month = 1; month <= 12; month++) {
        // Tạo ngày đầu tiên và ngày cuối cùng của tháng
        let firstDayOfMonth = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
        let lastDayOfMonth = new Date(year, month, 0); // Ngày cuối cùng của tháng

        // Tạo bộ lọc cho tháng hiện tại
        let filter = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: firstDayOfMonth,
                        $lt: lastDayOfMonth
                    },
                    "isNow": true
                }
            }
        };

        // Thực hiện aggregation để tính tổng doanh thu cho tháng hiện tại
        let result = await DonHang.aggregate([
            {
                $match: filter // Sử dụng bộ lọc cho tháng hiện tại
            },
            {
                $group: {
                    _id: null, // Tính tổng doanh thu của tất cả các đơn hàng trong tháng
                    tongDoanhThu: { $sum: "$tongTien" }
                }
            }
        ]);

        // Lưu tổng doanh thu của tháng hiện tại vào mảng monthlyRevenue
        monthlyRevenue.push(result.length > 0 ? result[0].tongDoanhThu : 0);
    }

    // Tạo bộ lọc cho các đơn hàng với thanhToan là true
    let firstDayOfMonth = new Date(year, 1, 1); // Ngày đầu tiên của tháng
    let lastDayOfMonth = new Date(year, 12, 0); // Ngày cuối cùng của tháng
    let filterThanhToanTrue = {
        "trangThai": {
            $elemMatch: {
                "trangThai": "Đã giao hàng",
                "thoiGian": {
                    $gte: firstDayOfMonth,
                    $lt: lastDayOfMonth
                },
            }
        },
        "thanhToan": true // Chỉ lấy các đơn hàng có thanhToan là true
    };
    // Thực hiện aggregation để tính tổng doanh thu cho các đơn hàng có thanhToan là true
    let resultThanhToanTrue = await DonHang.aggregate([
        {
            $match: filterThanhToanTrue // Sử dụng bộ lọc cho các đơn hàng có thanhToan là true
        },
        {
            $group: {
                _id: null, // Tính tổng doanh thu của tất cả các đơn hàng có thanhToan là true
                tongDoanhThu: { $sum: "$tongTien" }
            }
        }
    ]);


    // Lấy tổng doanh thu của các đơn hàng có thanhToan là true và false riêng biệt
    const tongDoanhThuTrue = resultThanhToanTrue.length > 0 ? resultThanhToanTrue[0].tongDoanhThu : 0;
    // Gửi mảng tổng doanh thu của từng tháng cùng với các tổng doanh thu riêng biệt
    const user = req.session.Account;
    res.render('thongke/doanhthu', {
        title: "Thống kê doanh thu",
        user: user,
        data: monthlyRevenue,
        year: year,
        tongDoanhThuTrue: tongDoanhThuTrue,
    });
}
exports.chiTietDoanhThu = async (req, res, next) => {
    const user = req.session.Account;
    const month = req.params.month;
    const year = req.params.year;
    let DayRevenue = []; // Mảng chứa tổng doanh thu hàng tháng
    // Lặp qua từ ngay 1 đến 31
    for (let day = 0; day <= 30; day++) {
        // Tạo ngày đầu tiên và ngày cuối cùng của tháng
        let firstHourofDay = new Date(year, month - 1, day, 0, 0, 0, 0); // Ngày đầu tiên của ngày
        let lastHourofDay = new Date(year, month - 1, day, 23, 59, 59, 999); // Ngày cuối cùng của ngày
        // Tạo bộ lọc cho tháng hiện tại
        let filter = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: firstHourofDay,
                        $lt: lastHourofDay
                    },
                    "isNow": true
                }
            }
        };

        // Thực hiện aggregation để tính tổng doanh thu cho tháng hiện tại
        let result = await DonHang.aggregate([
            {
                $match: filter // Sử dụng bộ lọc cho tháng hiện tại
            },
            {
                $group: {
                    _id: null, // Tính tổng doanh thu của tất cả các đơn hàng trong tháng
                    tongDoanhThu: { $sum: "$tongTien" }
                }
            }
        ]);

        // Lưu tổng doanh thu của tháng hiện tại vào mảng monthlyRevenue
        DayRevenue.push(result.length > 0 ? result[0].tongDoanhThu : 0);
    }
    // Tạo bộ lọc cho các đơn hàng với thanhToan là true
    // Tạo bộ lọc cho các đơn hàng với thanhToan là true
    let firstDayOfMonth = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
    let lastDayOfMonth = new Date(year, month, 0); // Ngày cuối cùng của tháng
    let filterThanhToanTrue = {
        "trangThai": {
            $elemMatch: {
                "trangThai": "Đã giao hàng",
                "thoiGian": {
                    $gte: firstDayOfMonth,
                    $lt: lastDayOfMonth
                },
            }
        },
        "thanhToan": true // Chỉ lấy các đơn hàng có thanhToan là true
    };
    // Thực hiện aggregation để tính tổng doanh thu cho các đơn hàng có thanhToan là true
    let resultThanhToanTrue = await DonHang.aggregate([
        {
            $match: filterThanhToanTrue // Sử dụng bộ lọc cho các đơn hàng có thanhToan là true
        },
        {
            $group: {
                _id: null, // Tính tổng doanh thu của tất cả các đơn hàng có thanhToan là true
                tongDoanhThu: { $sum: "$tongTien" }
            }
        }
    ]);

    //lay danh sach don hang trong thang nay
    let filterDonHang = {
        "trangThai": {
            $elemMatch: {
                "trangThai": "Đã giao hàng",
                "thoiGian": {
                    $gte: new Date(year, month - 1, 1),
                    $lt: new Date(year, month, 0)
                },
            }
        },
    };
    let listDonHang = await DonHang.find(filterDonHang)
    // Lấy tổng doanh thu của các đơn hàng có thanhToan là true và false riêng biệt
    const tongDoanhThuTrue = resultThanhToanTrue.length > 0 ? resultThanhToanTrue[0].tongDoanhThu : 0;
    // Gửi mảng tổng doanh thu của từng tháng cùng với các tổng doanh thu riêng biệt
    res.render('thongke/chitietdoanhthu', {
        title: "Chi tiết doanh thu tháng " + month + "/" + year,
        user: user,
        data: DayRevenue,
        year: year,
        tongDoanhThuTrue: tongDoanhThuTrue,
        listDonHang: listDonHang
    });
}

exports.sanpham = async (req, res) => {
    let year = new Date().getFullYear(); // Lấy năm hiện tại
    let monthlyRevenue = []; // Mảng chứa tổng doanh thu hàng tháng

    // Lặp qua từ tháng 1 đến tháng 12
    for (let month = 1; month <= 12; month++) {
        // Tạo ngày đầu tiên và ngày cuối cùng của tháng
        let firstDayOfMonth = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
        let lastDayOfMonth = new Date(year, month, 0); // Ngày cuối cùng của tháng

        // Tạo bộ lọc cho tháng hiện tại
        let filter = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: firstDayOfMonth,
                        $lt: lastDayOfMonth
                    },
                    "isNow": true
                }
            }
        }
        let result = await DonHang.aggregate([
            {
                $match: filter // Sử dụng bộ lọc cho tháng hiện tại
            },
            {
                $group: {
                    _id: null, // Tính tổng doanh thu của tất cả các đơn hàng trong tháng
                    tongSoluong: { $sum: "$soLuong" }
                }
            }
        ]);

        // Lưu tổng doanh thu của tháng hiện tại vào mảng monthlyRevenue

        monthlyRevenue.push(result.length > 0 ? result[0].tongSoluong : 0)
        
    }

    const ketQua = await SanPham.aggregate([
        {
          $unwind: "$bienThe" // Mở rộng các mảng biến thể thành các tài liệu độc lập
        },
        {
          $group: {
            _id: null, // Gom tất cả các tài liệu lại với nhau
            tongSoLuong: { $sum: "$bienThe.soLuong" } // Tính tổng số lượng của các biến thể
          }
        }
      ]);


    const user = req.session.Account;
    res.render('thongke/sanpham', {
        title: "Thống kê sản phẩm ",
        user: user,
        dataSp: monthlyRevenue,
        year:year,
        kho:ketQua.length >  0 ?  ketQua[0].tongSoLuong : 0,
    });



}

exports.sanphamTheoNam = async (req, res, next) => {
    const paramY = req.params.year;
    let year = parseInt(paramY);
    let monthlyRevenue = []; // Mảng chứa tổng doanh thu hàng tháng

    // Lặp qua từ tháng 1 đến tháng 12
    for (let month = 1; month <= 12; month++) {
        // Tạo ngày đầu tiên và ngày cuối cùng của tháng
        let firstDayOfMonth = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
        let lastDayOfMonth = new Date(year, month, 0); // Ngày cuối cùng của tháng

        // Tạo bộ lọc cho tháng hiện tại
        let filter = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: firstDayOfMonth,
                        $lt: lastDayOfMonth
                    },
                    "isNow": true
                }
            }
        };

        // Thực hiện aggregation để tính tổng doanh thu cho tháng hiện tại
        let result = await DonHang.aggregate([
            {
                $match: filter // Sử dụng bộ lọc cho tháng hiện tại
            },
            {
                $group: {
                    _id: null, // Tính tổng doanh thu của tất cả các đơn hàng trong tháng
                    tongDoanhThu: { $sum: "$soLuong" }
                }
            }
        ]);

        // Lưu tổng doanh thu của tháng hiện tại vào mảng monthlyRevenue
        monthlyRevenue.push(result.length > 0 ? result[0].tongDoanhThu : 0);
    }

    // Tạo bộ lọc cho các đơn hàng với thanhToan là true
    let firstDayOfMonth = new Date(year, 1, 1); // Ngày đầu tiên của tháng
    let lastDayOfMonth = new Date(year, 12, 0); // Ngày cuối cùng của tháng
    let filterThanhToanTrue = {
        "trangThai": {
            $elemMatch: {
                "trangThai": "Đã giao hàng",
                "thoiGian": {
                    $gte: firstDayOfMonth,
                    $lt: lastDayOfMonth
                },
            }
        },
        // Chỉ lấy các đơn hàng có thanhToan là true
    };
    // Thực hiện aggregation để tính tổng doanh thu cho các đơn hàng có thanhToan là true
    let resultThanhToanTrue = await DonHang.aggregate([
        {
            $match: filterThanhToanTrue // Sử dụng bộ lọc cho các đơn hàng có thanhToan là true
        },
        {
            $group: {
                _id: null, // Tính tổng doanh thu của tất cả các đơn hàng có thanhToan là true
                tongDoanhThu: { $sum: "$soLuong" }
            }
        }
    ]);

    const ketQua = await SanPham.aggregate([
        {
          $unwind: "$bienThe" // Mở rộng các mảng biến thể thành các tài liệu độc lập
        },
        {
          $group: {
            _id: null, // Gom tất cả các tài liệu lại với nhau
            tongSoLuong: { $sum: "$bienThe.soLuong" } // Tính tổng số lượng của các biến thể
          }
        }
      ]);


    // Lấy tổng doanh thu của các đơn hàng có thanhToan là true và false riêng biệt
    const tongDoanhThuTrue = resultThanhToanTrue.length > 0 ? resultThanhToanTrue[0].tongDoanhThu : 0;
    console.log(tongDoanhThuTrue)
    // Gửi mảng tổng doanh thu của từng tháng cùng với các tổng doanh thu riêng biệt
    const user = req.session.Account;
    res.render('thongke/sanpham', {
        title: "Thống kê sản phẩm",
        user: user,
        dataSp: monthlyRevenue,
        year: year,
        kho:ketQua == 0 ?  0 : ketQua,
        
    });
}