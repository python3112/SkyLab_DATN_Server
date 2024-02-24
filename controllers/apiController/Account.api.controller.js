var Account = require('../../models/Account');
const multer = require('multer');
const {getStorage} = require('firebase/storage');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.listAccounts = async (req, res, next) => {
    try {
        const account = await Account.find({ trangThai: true });
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin của một account dựa trên ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  
  exports.signUp = async (req, res) => {
    try {
        const { tenQuyen, taiKhoan, matKhau,hoTen, sdt, trangThai } = req.body;

        // Kiểm tra nếu tài khoản đã tồn tại
        // const existingTaiKhoan = await Account.findOne({ taiKhoan : taiKhoan });
        // if (existingTaiKhoan) {
        //     return res.status(400).json({ success: false, message: 'Tài khoản đã tồn tại' });
        // }

        // Kiểm tra nếu số điện thoại đã tồn tại
        // const existingSdt = await Account.findOne({ sdt });
        // if (existingSdt) {
        //     return res.status(400).json({ success: false, message: 'Số điện thoại đã tồn tại' });
        // }

        // Tạo tài khoản mới
        const newAccount = new Account({
            tenQuyen  : tenQuyen,
            taiKhoan :  taiKhoan,
            matKhau :  matKhau,
            hoTen :  hoTen,
            sdt :  sdt,
            trangThai  : trangThai
        });
        await newAccount.save();
        // Trả về thành công
        return res.status(201).json({ success: true, message: 'Đăng ký thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Đăng nhập tài khoản
exports.signIn = async (req, res) => {
    try {
        const { taiKhoan, matKhau } = req.body;

        // Kiểm tra xem tài khoản tồn tại
        const existingAccount = await Account.findOne({ taiKhoan, trangThai: true, tenQuyen: 'User' });

        if (!existingAccount) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại' });
        }

        if(existingAccount.matKhau != matKhau){
            return res.status(401).json({ message: 'Mật khẩu không chính xác' });
        }
        // Nếu tài khoản và mật khẩu đúng, trả về ID của tài khoản
        return res.status(200).json({_id:existingAccount._id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Cập nhật họ tên của một account dựa trên ID
exports.editHoTen = async (req, res) => {
    try {
        const { hoTen } = req.body;
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        account.hoTen = hoTen;
        await account.save();

        res.json({ success: true, message: 'Cập nhật họ tên thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật mật khẩu của một account dựa trên ID
exports.editMatKhau = async (req, res) => {
    try {
        const { matKhau } = req.body;
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        account.matKhau = matKhau;
        await account.save();

        res.json({ success: true, message: 'Cập nhật mật khẩu thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật số điện thoại của một account dựa trên ID
exports.editSdt = async (req, res) => {
    try {
        const { sdt } = req.body;
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        account.sdt = sdt;
        await account.save();

        res.json({ success: true, message: 'Cập nhật số điện thoại thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật email của một account dựa trên ID
exports.editEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        account.email = email;
        await account.save();

        res.json({ success: true, message: 'Cập nhật email thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật trạng thái của một account dựa trên ID
exports.editTrangThai = async (req, res) => {
    try {
        const { trangThai } = req.body;
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        account.trangThai = trangThai;
        await account.save();

        res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.editAvatar = async (req, res) => {
    try {
        const accountId = req.params.id;
        const file = req.file;

        // Truy vấn để lấy thông tin cũ của account
        const oldAccount = await Account.findById(accountId);

        if (!oldAccount) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        // Lấy ra đường dẫn ảnh cũ từ thông tin cũ
        const oldAvatar = oldAccount.avatar;

        if (oldAvatar) {
            // Xóa ảnh cũ trên Firebase Storage
            await deleteImage(oldAvatar);
        }

        if (file) {
            oldAccount.avatar = await uploadImage(file, nameFolder);
        }

        await oldAccount.save();

        res.json({ success: true, message: 'Cập nhật avatar thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

// Thêm địa chỉ cho một account dựa trên ID
exports.themDiaChi = async (req, res) => {
    try {
      const accountId = req.params.id;
      const { tenDiaChi, diaChi, trangThai } = req.body;
  
      const account = await Account.findById(accountId);
  
      if (!account) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
      }
  
      const newDiaChi = { tenDiaChi, diaChi, trangThai };
      account.diaChi.push(newDiaChi);
  
      await account.save();
  
      res.json({ success: true, message: 'Thêm địa chỉ thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Lấy tất cả các địa chỉ của một account dựa trên ID
  exports.getDiaChiTheoAccount = async (req, res) => {
    try {
      const accountId = req.params.id;
      const account = await Account.findById(accountId);
  
      if (!account) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
      }
  
      res.json(account.diaChi);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Sửa địa chỉ theo ID của địa chỉ
exports.suaDiaChiTheoId = async (req, res) => {
    try {
      const accountId = req.params.id;
      const diaChiId = req.params.diaChiId; // ID của địa chỉ cần sửa
      const { tenDiaChi, diaChi, trangThai } = req.body;
  
      const account = await Account.findById(accountId);
  
      if (!account) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
      }
  
      const diaChiToUpdate = account.diaChi.id(diaChiId);
  
      if (!diaChiToUpdate) {
        return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
      }
  
      // Cập nhật chỉ các trường được truyền
      if (tenDiaChi) {
        diaChiToUpdate.tenDiaChi = tenDiaChi;
      }
  
      if (diaChi) {
        diaChiToUpdate.diaChi = diaChi;
      }
  
      if (trangThai !== undefined) {
        diaChiToUpdate.trangThai = trangThai;
      }
  
      await account.save();
  
      res.json({ success: true, message: 'Sửa địa chỉ thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  