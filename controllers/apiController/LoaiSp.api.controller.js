const TheloaiSp = require('../../models/TheloaiSp');

// Lấy tất cả các loại sản phẩm có trạng thái là true
exports.getAllLoaiSp = async (req, res) => {
    try {
        const loaiSp = await TheloaiSp.find({ trangThai: true });
        res.json(loaiSp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin của một hãng sản xuất dựa trên ID
exports.getLoaiSpById = async (req, res) => {
    try {
        const loaiSp = await TheloaiSp.findById(req.params.id);
        if (!loaiSp) {
            return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
        }
        res.json(loaiSp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm loại sản phẩm
exports.postLoaiSp = async (req, res) => {
    try {
        const { tenTheLoai, trangThai } = req.body;

        // Kiểm tra nếu loại sản phẩm đã tồn tại
        const existingLoaiSp = await TheloaiSp.findOne({ tenTheLoai });
        if (existingLoaiSp) {
            return res.status(400).json({ message: 'Loại sản phẩm đã tồn tại' });
        }

        const newLoaiSp = new TheloaiSp({
            tenTheLoai,
            trangThai,
        });
        const savedLoaiSp = await newLoaiSp.save();

        return res.status(201).json(savedLoaiSp);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Sửa thông tin của một loại sản phẩm dựa trên ID
exports.editLoaiSp = async (req, res) => {
    try {
      const loaiSpId = req.params.id;
      const { tenTheLoai, trangThai } = req.body;
      const updateFields = {};
      if (tenTheLoai) updateFields.tenTheLoai = tenTheLoai;
      if (trangThai !== undefined) updateFields.trangThai = trangThai;

      // Kiểm tra nếu loại sản phẩm đã tồn tại
      if (tenTheLoai) {
        const existingLoaiSp = await TheloaiSp.findOne({tenTheLoai});
        if (existingLoaiSp) {
            return res.status(400).json({ message: 'Loại sản phẩm đã tồn tại' });
        }
    }
    
      const updatedLoaiSp = await TheloaiSp.findByIdAndUpdate(
        loaiSpId,
        updateFields,
        { new: true } // Trả về dữ liệu mới sau khi cập nhật
      );
  
      if (!updatedLoaiSp) {
        return res.status(404).json({ message: 'Không tìm thấy loại sản phẩm' });
      }
  
      return res.status(200).json(updatedLoaiSp);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };
  