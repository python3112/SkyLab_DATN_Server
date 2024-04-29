const DonHang = require('../models/DonDatHang');
const { SanPham } = require('../models/SanPham')
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
        let firstDayOfMonth = new Date(year, month - 1, 0); // Ngày đầu tiên của tháng
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
    console.log("doanh thu : " + monthlyRevenue);

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
        let firstDayOfMonth = new Date(year, month - 1, 0); // Ngày đầu tiên của tháng
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
    let lastDayOfMonth = new Date(year, 12, 31); // Ngày cuối cùng của tháng

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
    try {
        const { month, year } = req.params;
        const user = req.session.Account;



        const DayRevenue = []; // Initialize array to store daily revenue


        // Calculate revenue for each day of the month
        for (let day = 0; day <= 30; day++) {
            const firstHourofDay = new Date(year, month - 1, day, 0, 0, 0, 0);
            const lastHourofDay = new Date(year, month - 1, day + 1, 0, 0, 0, 0);

            const filter = {
                "trangThai": {
                    $elemMatch: {
                        "trangThai": "Đã giao hàng",
                        "thoiGian": { $gte: firstHourofDay, $lt: lastHourofDay },
                        "isNow": true
                    }
                }
            };

            const result = await DonHang.aggregate([
                { $match: filter },
                { $group: { _id: null, tongDoanhThu: { $sum: "$tongTien" } } }
            ]);

            DayRevenue[day - 1] = result.length > 0 ? result[0].tongDoanhThu : 0;
        }

        // Filter orders for the entire month
        const firstDayOfMonth = new Date(year, month - 1, 0);
        const lastDayOfMonth = new Date(year, month - 1, 31);
        const filterDonHang = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
                }
            }
        };

        const listDonHang = await DonHang.find(filterDonHang);

        // Calculate total revenue for paid orders
        const filterThanhToanTrue = {
            "trangThai": { $elemMatch: { "trangThai": "Đã giao hàng", "thoiGian": { $gte: firstDayOfMonth, $lt: lastDayOfMonth } } },
            "thanhToan": true
        };

        const resultThanhToanTrue = await DonHang.aggregate([
            { $match: filterThanhToanTrue },
            { $group: { _id: null, tongDoanhThu: { $sum: "$tongTien" } } }
        ]);

        const tongDoanhThuTrue = resultThanhToanTrue.length > 0 ? resultThanhToanTrue[0].tongDoanhThu : 0;

        // Render view with data
        res.render('thongke/chitietdoanhthu', {
            title: `Chi tiết doanh thu tháng ${month}/${year}`,
            user,
            data: DayRevenue,
            year,
            month,
            day: "Tất cả các ngày",
            tongDoanhThuTrue,
            listDonHang
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.chiTietDoanhThuNgay = async (req, res, next) => {
    try {
        const user = req.session.Account;
        const { month, year, day } = req.params;

        const DayRevenue = [];
        for (let dayOfMonth = 1; dayOfMonth <= 30; dayOfMonth++) {
            const firstHourOfDay = new Date(year, month - 1, dayOfMonth, 0, 0, 0, 0);
            const lastHourOfDay = new Date(year, month - 1, dayOfMonth, 23, 59, 59, 999);

            const filter = {
                "trangThai": {
                    $elemMatch: {
                        "trangThai": "Đã giao hàng",
                        "thoiGian": { $gte: firstHourOfDay, $lt: lastHourOfDay },
                        "isNow": true
                    }
                }
            };

            const result = await DonHang.aggregate([
                { $match: filter },
                { $group: { _id: null, tongDoanhThu: { $sum: "$tongTien" } } }
            ]);

            DayRevenue.push(result.length > 0 ? result[0].tongDoanhThu : 0);
        }

        const firstDayOfMonth = new Date(year, month - 1, 0);
        const lastDayOfMonth = new Date(year, month - 1, 31);
        const filterThanhToanTrue = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
                }
            },
            "thanhToan": true
        };

        const resultThanhToanTrue = await DonHang.aggregate([
            { $match: filterThanhToanTrue },
            { $group: { _id: null, tongDoanhThu: { $sum: "$tongTien" } } }
        ]);

        const filterDonHang = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": {
                        $gte: new Date(year, month - 1, day, 0, 0, 0, 0),
                        $lt: new Date(year, month - 1, day, 23, 59, 59, 999)
                    },
                    isNow : true
                }
            }
        };

        const listDonHang = await DonHang.find(filterDonHang);

        const tongDoanhThuTrue = resultThanhToanTrue.length > 0 ? resultThanhToanTrue[0].tongDoanhThu : 0;

        res.render('thongke/chitietdoanhthu', {
            title: `Chi tiết doanh thu ngày ${day}/${month}/${year}`,
            user,
            data: DayRevenue,
            year,
            month,
            day: `Ngày ${day}`,
            tongDoanhThuTrue,
            listDonHang
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.sanpham = async (req, res) => {
    let year = new Date().getFullYear(); // Lấy năm hiện tại
    let monthlyRevenue = [];
    // Mảng chứa tổng doanh thu hàng tháng
    const productDetails = [];
    try {
        // Lặp qua từ tháng 1 đến tháng 12
        for (let month = 1; month <= 12; month++) {
            // Tạo ngày đầu tiên và ngày cuối cùng của tháng
            let firstDayOfMonth = new Date(year, month - 1, 0); // Ngày đầu tiên của tháng
            let lastDayOfMonth = new Date(year, month, -1, 31); // Ngày cuối cùng của tháng

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
        /// lấy ra 10 sản phẩm bán chạy nhất 
        const top10Banchay = await DonHang.aggregate([
            // Lọc các đơn đặt hàng có trạng thái là 'Đã giao hàng'
            { $match: { 'trangThai.trangThai': 'Đã giao hàng' } },
            // Group các đơn đặt hàng theo id sản phẩm và id biến thể, tính tổng số lượng
            {
                $group: {
                    _id: { idSanPham: '$idSanPham', idBienThe: '$idBienThe' },
                    totalQuantity: { $sum: '$soLuong' }
                }
            },
            // Sắp xếp theo số lượng giảm dần
            { $sort: { totalQuantity: -1 } },
            // Giới hạn kết quả trả về 10 phần tử
            { $limit: 10 }
        ]);
        for (const item of top10Banchay) {
            // Tìm thông tin sản phẩm từ ID
            const product = await SanPham.findById(item._id.idSanPham);
            if (product) {
                // Tìm thông tin biến thể từ ID
                const variant = product.bienThe.find(variant => variant._id.toString() === item._id.idBienThe);
                if (variant) {
                    // Thêm thông tin sản phẩm và số lượng vào mảng productDetails
                    productDetails.push({
                        tenSanPham: product.tenSanPham,
                        hinhAnh: product.anhSanPham,
                        ram: variant.ram,
                        rom: variant.rom,
                        totalQuantity: item.totalQuantity
                    });
                }
            }
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
        const spKho = await SanPham.aggregate([
            {
                $unwind: "$bienThe" // Mở rộng các mảng biến thể thành các tài liệu độc lập
            },
          
        ]);


        // console.log(filteredProducts)

        const user = req.session.Account;
        res.render('thongke/sanpham', {
            title: "Thống kê sản phẩm ",
            user: user,
            dataSp: monthlyRevenue,
            year: year,
            kho: ketQua.length > 0 ? ketQua[0].tongSoLuong : 0,
            top10banchay: productDetails,
            spKho:spKho,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

exports.sanphamTheoNam = async (req, res, next) => {
    const paramY = req.params.year;
    let year = parseInt(paramY);
    let monthlyRevenue = [];
    const productDetails = []; // Mảng chứa tổng doanh thu hàng tháng

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
    let filterTop10 = {
        "trangThai": {
            $elemMatch: {
                "trangThai": "Đã giao hàng",
                "thoiGian": {
                    $gte: new Date(year, 0, 1),
                    $lt: new Date(year + 1, 0, 1)
                },
                "isNow": true
            }
        }
    }

    const top10Banchay = await DonHang.aggregate([
        {
            $match: filterTop10

        },
        {
            $group: {
                _id: { idSanPham: '$idSanPham', idBienThe: '$idBienThe' },
                totalQuantity: { $sum: '$soLuong' }
            }
        },
        { $sort: { totalQuantity: -1 } }, // Sắp xếp theo số lượng giảm dần
        { $limit: 10 } // Giới hạn kết quả trả về 10 phần tử
    ]);

    // Lặp qua các sản phẩm và lấy thông tin chi tiết của sản phẩm
    for (const item of top10Banchay) {
        // Tìm thông tin sản phẩm từ ID
        const product = await SanPham.findById(item._id.idSanPham);
        if (product) {
            // Tìm thông tin biến thể từ ID
            const variant = product.bienThe.find(variant => variant._id.toString() === item._id.idBienThe);
            if (variant) {
                // Thêm thông tin sản phẩm và số lượng vào mảng productDetails
                productDetails.push({
                    _id: product.id,
                    idBienThe: variant.id,
                    tenSanPham: product.tenSanPham,
                    hinhAnh: product.anh[1],
                    ram: variant.ram,
                    rom: variant.rom,
                    totalQuantity: item.totalQuantity
                });
            }
        }
    }

    // Tạo bộ lọc cho các đơn hàng với thanhToan là true
    // Ngày cuối cùng của tháng

    // Thực hiện aggregation để tính tổng doanh thu cho các đơn hàng có thanhToan là true

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
    //// lấy sản phẩm trong kho 

    const spKho = await SanPham.aggregate([
        {
            $unwind: "$bienThe" // Mở rộng các mảng biến thể thành các tài liệu độc lập
        },
      
    ]);



    // Gửi mảng tổng doanh thu của từng tháng cùng với các tổng doanh thu riêng biệt
    console.log(spKho)
    const user = req.session.Account;
    res.render('thongke/sanpham', {
        title: "Thống kê sản phẩm",
        user: user,
        dataSp: monthlyRevenue,
        year: year,
        kho: ketQua.length > 0 ? ketQua[0].tongSoLuong : 0,
        top10banchay: productDetails,
        spKho:spKho,
    });
};
<<<<<<< HEAD
exports.chiTietDoanhThuNgayStatus = async (req, res, next) => {
    try {
        const user = req.session.Account;
        const { status,month, year, day } = req.params;
        const DayRevenue = [];
        for (let dayOfMonth = 1; dayOfMonth <= 30; dayOfMonth++) {
            const firstHourOfDay = new Date(year, month - 1, dayOfMonth, 0, 0, 0, 0);
            const lastHourOfDay = new Date(year, month - 1, dayOfMonth, 23, 59, 59, 999);
=======
exports.chiTietDoanhThuSp = async (req, res, next) => {
    try {
        const { month, year } = req.params;
        const user = req.session.Account;
        const productDetails = [];


        const DayRevenue = []; // Initialize array to store daily revenue


        // Calculate revenue for each day of the month
        for (let day = 0; day <= 30; day++) {
            const firstHourofDay = new Date(year, month - 1, day, 0, 0, 0, 0);
            const lastHourofDay = new Date(year, month - 1, day + 1, 0, 0, 0, 0);
>>>>>>> 2be33cec1e004cd954e10a8c478baaf2082b648d

            const filter = {
                "trangThai": {
                    $elemMatch: {
<<<<<<< HEAD
                        "trangThai":status,
                        "thoiGian": { $gte: firstHourOfDay, $lt: lastHourOfDay },
=======
                        "trangThai": "Đã giao hàng",
                        "thoiGian": { $gte: firstHourofDay, $lt: lastHourofDay },
>>>>>>> 2be33cec1e004cd954e10a8c478baaf2082b648d
                        "isNow": true
                    }
                }
            };

            const result = await DonHang.aggregate([
                { $match: filter },
<<<<<<< HEAD
                { $group: { _id: null, tongDoanhThu: { $sum: "$tongTien" } } }
            ]);

            DayRevenue.push(result.length > 0 ? result[0].tongDoanhThu : 0);
        }

        const firstDayOfMonth = new Date(year, month - 1, 0);
        const lastDayOfMonth = new Date(year, month - 1, 31);
        const filterThanhToanTrue = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": status,
                    "thoiGian": { $gte: firstDayOfMonth, $lt: lastDayOfMonth },
                    isNow : true
                }
            },
            "thanhToan": true,

        };

        const resultThanhToanTrue = await DonHang.aggregate([
            { $match: filterThanhToanTrue },
            { $group: { _id: null, tongDoanhThu: { $sum: "$tongTien" } } }
        ]);

        const filterDonHang = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": status,
                    "thoiGian": {
                        $gte: new Date(year, month - 1, day, 0, 0, 0, 0),
                        $lt: new Date(year, month - 1, day, 23, 59, 59, 999)
                    },
                    isNow : true
=======
                { $group: { _id: null, tongSoLuong: { $sum: "$soLuong" } } }
            ]);

            DayRevenue[day - 1] = result.length > 0 ? result[0].tongSoLuong : 0;
        }

        // Filter orders for the entire month
        const firstDayOfMonth = new Date(year, month - 1, 0);
        const lastDayOfMonth = new Date(year, month - 1, 31);
        const filterDonHang = {
            "trangThai": {
                $elemMatch: {
                    "trangThai": "Đã giao hàng",
                    "thoiGian": { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
>>>>>>> 2be33cec1e004cd954e10a8c478baaf2082b648d
                }
            }
        };

<<<<<<< HEAD
        const listDonHang = await DonHang.find(filterDonHang);

        const tongDoanhThuTrue = resultThanhToanTrue.length > 0 ? resultThanhToanTrue[0].tongDoanhThu : 0;

        res.render('thongke/chitietdoanhthu', {
            title: status+` ${day}/${month}/${year}`,
            user,
            data: DayRevenue,
            year,
            month,
            day: `Ngày ${day}`,
            tongDoanhThuTrue,
            listDonHang
        });
    } catch (error) {
=======
        const thongke1thang = await DonHang.aggregate([
            {
                $match: filterDonHang
    
            },
            {
                $group: {
                    _id: { idDonhang : '$_id', idSanPham: '$idSanPham', idBienThe: '$idBienThe'  },

                    totalQuantity: { $sum: '$soLuong' },
                  
                }
            },
           // Sắp xếp theo số lượng giảm dần
             // Giới hạn kết quả trả về 10 phần tử
        ]);
       
  for (const item of thongke1thang) {
        // Tìm thông tin sản phẩm từ ID
        const product = await SanPham.findById(item._id.idSanPham);
        if (product) {
            // Tìm thông tin biến thể từ ID
            const variant = product.bienThe.find(variant => variant._id.toString() === item._id.idBienThe);
            if (variant) {
                // Thêm thông tin sản phẩm và số lượng vào mảng productDetails
                productDetails.push({
                    _id: item.id,
                    idBienThe: variant.idDonhang,
                    tenSanPham: product.tenSanPham,
                    hinhAnh: product.anh[1],
                    ram: variant.ram,
                    rom: variant.rom,
                    totalQuantity: item.totalQuantity
                });
            }
        }
    }
        // Calculate total revenue for paid orders
        console.log(productDetails);

        // Render view with data
        res.render('thongke/chitietsanpham', {
            title: `Chi tiết doanh thu tháng ${month}/${year}`,
            user : user,
            data: DayRevenue,
            year,
            month,
            day: "Tất cả các ngày",
            
        });
    } catch (error) {
        // Handle errors
>>>>>>> 2be33cec1e004cd954e10a8c478baaf2082b648d
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
<<<<<<< HEAD
=======

>>>>>>> 2be33cec1e004cd954e10a8c478baaf2082b648d
