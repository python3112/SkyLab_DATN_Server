const DonHang = require('../models/DonDatHang');
const {SanPham} = require('../models/SanPham'); 
const Account = require('../models/Account'); 

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
