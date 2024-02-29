const { Shop } = require('../../models/Shop');
const Account = require('../../models/Account');
const { uploadImage, deleteImage } = require('../../middlewares/upload.image.firebase');
const nameFolder = 'Shop';

  // Lấy shop theo id account
  exports.getShopById = async (req, res) => {
    try {
      const accountId = req.params.id;
      const account = await Account.findById(accountId);
  
      if (!account) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
      }
  
      res.json(account.shop);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
// Tạo một shop mới
exports.createShop = async (req, res) => {
    try {
        const accountId = req.params.id;
        const { tenShop, trangThai } = req.body;
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Chưa có file upload' });
        }
        // Kiểm tra nếu tên shop đã tồn tại
        const existingShop = await Shop.findOne({ tenShop });
        if (existingShop) {
            return res.status(400).json({ message: 'Tên shop đã tồn tại' });
        }
        const imageUrl = await uploadImage(file, nameFolder);

        const newShop = new Shop({
            tenShop,
            trangThai,
            avatar: imageUrl,
        });

        // Kiểm tra xem account.shop đã được định nghĩa chưa
        if (!account.shop) {
            account.shop = {}; // Nếu chưa, bạn có thể khởi tạo là một đối tượng trống
        }

        // Gán thông tin của newShop vào account.shop
        account.shop = {
            ...account.shop,
            tenShop: newShop.tenShop,
            trangThai: newShop.trangThai,
            avatar: newShop.avatar,
        };
        await account.save();
        await newShop.save();
        return res.status(201).json({ success: true, message: 'Tạo shop mới thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Chỉnh sửa tên shop
exports.editTenShop = async (req, res) => {
    try {
        const accountId = req.params.id;
        const { tenShop } = req.body;

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        if (!account.shop) {
            return res.status(404).json({ message: 'Không tìm thấy shop của tài khoản' });
        }

        // Kiểm tra nếu tên shop đã tồn tại
        const existingShop = await Shop.findOne({ tenShop });
        if (existingShop) {
            return res.status(400).json({ message: 'Tên shop đã tồn tại' });
        }

        // Cập nhật tên shop
        account.shop.tenShop = tenShop;
        await account.save();

        res.json({ success: true, message: 'Chỉnh sửa tên shop thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Chỉnh sửa số điện thoại shop
exports.editSdt = async (req, res) => {
    try {
        const accountId = req.params.id;
        const { sdt } = req.body;

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        if (!account.shop) {
            return res.status(404).json({ message: 'Không tìm thấy shop của tài khoản' });
        }

        // Cập nhật số điện thoại shop
        account.shop.sdt = sdt;
        await account.save();

        res.json({ success: true, message: 'Chỉnh sửa số điện thoại shop thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.editDiaChi = async (req, res) => {
    try {
      const accountId = req.params.id;
      const { tenDiaChi, diaChi, trangThai } = req.body;
  
      const account = await Account.findById(accountId);
  
      if (!account) {
        return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
      }
  
      const newDiaChi = { tenDiaChi, diaChi, trangThai };
      // Gán thông tin của newShop vào account.shop
      account.shop.diaChi = newDiaChi;
      await account.save();
  
      res.json({ success: true, message: 'Thêm địa chỉ thành công' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Chỉnh sửa trạng thái shop
exports.editTrangThai = async (req, res) => {
    try {
        const accountId = req.params.id;
        const { trangThai } = req.body;

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        if (!account.shop) {
            return res.status(404).json({ message: 'Không tìm thấy shop của tài khoản' });
        }

        // Cập nhật trạng thái shop
        account.shop.trangThai = trangThai;
        await account.save();

        res.json({ success: true, message: 'Chỉnh sửa trạng thái shop thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật avatar
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
        const oldAvatar = oldAccount.shop.avatar;

        if (oldAvatar) {
            // Xóa ảnh cũ trên Firebase Storage
            await deleteImage(oldAvatar);
        }

        if (file) {
            oldAccount.shop.avatar = await uploadImage(file, nameFolder);
        }

        await oldAccount.save();

        res.json({ success: true, message: 'Cập nhật avatar thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Lấy địa chỉ của shop
exports.getDiaChi = async (req, res) => {
    try {
        const accountId = req.params.id;

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        if (!account.shop || !account.shop.diaChi) {
            return res.status(404).json({ message: 'Không tìm thấy địa chỉ của shop' });
        }

        res.json(account.shop.diaChi);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};