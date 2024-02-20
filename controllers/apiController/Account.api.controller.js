var accoutModel = require('../../models/Account');

exports.listAccounts = async (req, res, next) => {
    try {
      const accounts = await accoutModel.find().sort({ _id: -1 });
      if (accounts.length > 0) {
        res.json({ status: 200, msg: "Lấy dữ liệu thành công", data: accounts });
      } else {
        res.json({ status: 204, msg: "Không có dữ liệu", data: [] });
      }
    } catch (err) {
      res.json({ status: 500, msg: err.message, data: [] });
    }
  };
  
  exports.createAccount = async (req, res, next) => {
    try {
      const newAccount = new Account({
        nameTk: req.body.nameTk,
        passTk: req.body.passTk,
        quyenTc: req.body.quyenTc,
        avavta: req.body.avavta,
        ttTaiKhoan: req.body.ttTaiKhoan || false,
      });
  
      await newAccount.save();
      res.json({ status: 200, msg: "Thêm tài khoản thành công" });
    } catch (err) {
      res.json({ status: 500, msg: err.message });
    }
  };
  
  exports.getAccountByName = async (req, res, next) => {
    try {
      const account = await accoutModel.findOne({ nameTk: req.params.nameTk });
      if (account) {
        res.json({ status: 200, msg: "Lấy dữ liệu thành công", data: account });
      } else {
        res.json({ status: 204, msg: "Không tìm thấy tài khoản", data: null });
      }
    } catch (err) {
      res.json({ status: 500, msg: err.message, data: null });
    }
  };
  
  exports.getAccountById = async (req, res, next) => {
    try {
      const account = await accoutModel.findById(req.params.id);
      if (account) {
        res.json({ status: 200, msg: "Lấy dữ liệu thành công", data: account });
      } else {
        res.json({ status: 204, msg: "Không tìm thấy tài khoản", data: null });
      }
    } catch (err) {
      res.json({ status: 500, msg: err.message, data: null });
    }
  };
  
  exports.updateAccount = async (req, res, next) => {
    try {
      const updatedData = {
        nameTk: req.body.nameTk,
        passTk: req.body.passTk,
        quyenTc: req.body.quyenTc,
        avavta: req.body.avavta,
        ttTaiKhoan: req.body.ttTaiKhoan || true,
      };
  
      await Account.updateOne({ _id: req.params.id }, updatedData);
      res.json({ status: 200, msg: "Sửa thông tin tài khoản thành công" });
    } catch (err) {
      res.json({ status: 500, msg: err.message });
    }
  };
  
  exports.deactivateAccount = async (req, res, next) => {
    try {
      await Account.updateOne({ _id: req.params.id }, { ttTaiKhoan: false });
      res.json({ status: 200, msg: "Vô hiệu hóa tài khoản thành công" });
    } catch (err) {
      res.json({ status: 500, msg: err.message });
    }
  };
  