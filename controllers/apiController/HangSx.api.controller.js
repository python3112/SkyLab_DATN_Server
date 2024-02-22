const Hangsx = require('../../models/Hangsx');
const { uploadImage, deleteImage } = require('../../middlewares/upload.image.firebase');
const nameFolder = 'HangSx';
// Lấy tất cả các hãng sản xuất có trạng thái là true
exports.getAllHangsx = async (req, res) => {
  try {
    const hangsx = await Hangsx.find({ trangThai: true });
    res.json(hangsx);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin của một hãng sản xuất dựa trên ID
exports.getHangsxById = async (req, res) => {
  try {
    const hangsx = await Hangsx.findById(req.params.id);
    if (!hangsx) {
      return res.status(404).json({ message: 'Không tìm thấy hãng sản xuất' });
    }
    res.json(hangsx);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postHangSx = async (req, res) => {
  try {
    const { tenHangSx, trangThai } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Chưa có file upload' });
    }

    const imageUrl = await uploadImage(file, nameFolder);

    const newHangsx = new Hangsx({
      tenHangSx,
      trangThai,
      imageLogo: imageUrl,
    });

    const savedHangsx = await newHangsx.save();

    return res.status(201).json(savedHangsx);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Sửa thông tin của một hãng sản xuất dựa trên ID
exports.editHangSx = async (req, res) => {
  try {
    const hangsxId = req.params.id;
    const { tenHangSx, trangThai } = req.body;
    const file = req.file;

    // Truy vấn để lấy thông tin cũ của hãng sản xuất
    const oldHangsx = await Hangsx.findById(hangsxId);

    if (!oldHangsx) {
      return res.status(404).json({ message: 'Không tìm thấy hãng sản xuất' });
    }

    // Lấy ra đường dẫn ảnh cũ từ thông tin cũ
    const oldImageLogo = oldHangsx.imageLogo;

    // Tạo một object chứa các thuộc tính cần cập nhật
    const updateFields = {};
    if (tenHangSx) updateFields.tenHangSx = tenHangSx;
    if (trangThai !== undefined) updateFields.trangThai = trangThai;
    if (file) {
      // Xóa ảnh cũ trên Firebase Storage
      await deleteImage(oldImageLogo);
      updateFields.imageLogo = await uploadImage(file, nameFolder);
    }

    const updatedHangsx = await Hangsx.findByIdAndUpdate(
      hangsxId,
      updateFields,
      { new: true } // Trả về dữ liệu mới sau khi cập nhật
    );

    if (!updatedHangsx) {
      return res.status(404).json({ message: 'Không tìm thấy hãng sản xuất' });
    }

    return res.status(200).json(updatedHangsx);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

