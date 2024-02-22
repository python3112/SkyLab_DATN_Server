const TheloaiSp = require('../../models/TheloaiSp');

// Create
exports.createTheloaiSp = async (req, res, next) => {
  try {
    const newTheloaiSp = new TheloaiSp({
      idSanpham: req.body.idSanpham,
      tenTheLoai: req.body.tenTheLoai,
      trangThai: req.body.trangThai || true,
    });

    await newTheloaiSp.save();
    res.json({ status: 200, msg: "Thêm thể loại sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
};

// Read all
exports.listTheloaiSp = async (req, res, next) => {
  try {
    const theloaiSps = await TheloaiSp.find().sort({ _id: -1 });
    if (theloaiSps.length > 0) {
      res.json({ status: 200, msg: "Lấy dữ liệu thể loại sản phẩm thành công", data: theloaiSps });
    } else {
      res.json({ status: 204, msg: "Không có dữ liệu thể loại sản phẩm", data: [] });
    }
  } catch (err) {
    res.json({ status: 500, msg: err.message, data: [] });
  }
};

// Read by ID
exports.getTheloaiSpById = async (req, res, next) => {
  try {
    const theloaiSp = await TheloaiSp.findById(req.params.id);
    if (theloaiSp) {
      res.json({ status: 200, msg: "Lấy dữ liệu thể loại sản phẩm thành công", data: theloaiSp });
    } else {
      res.json({ status: 204, msg: "Không tìm thấy thể loại sản phẩm", data: null });
    }
  } catch (err) {
    res.json({ status: 500, msg: err.message, data: null });
  }
};

// Update by ID
exports.updateTheloaiSp = async (req, res, next) => {
  try {
    const updatedData = {
      idSanpham: req.body.idSanpham,
      tenTheLoai: req.body.tenTheLoai,
      trangThai: req.body.trangThai || true,
    };

    await TheloaiSp.updateOne({ _id: req.params.id }, updatedData);
    res.json({ status: 200, msg: "Sửa thông tin thể loại sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
};

// Delete by ID
exports.deleteTheloaiSp = async (req, res, next) => {
  try {
    await TheloaiSp.deleteOne({ _id: req.params.id });
    res.json({ status: 200, msg: "Xóa thể loại sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
};
