const SanPham = require('../../models/SanPham');
const { validationResult } = require('express-validator');
// Create
exports.createSanPham = async (req, res, next) => {
  try {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, msg: 'Validation failed', errors: errors.array() });
    }

    const newSanPham = new SanPham({
      soLuong: req.body.soLuong,
      trangThai: req.body.trangThai || true,
      giaTien: req.body.giaTien,
      weight: req.body.weight,
      os: req.body.os,
      cpu: req.body.cpu,
      gpu: req.body.gpu,
      display: req.body.display,
      moTa: req.body.moTa,
      anh: req.body.anh || [],
    });

    await newSanPham.save();
    res.json({ status: 200, msg: "Thêm sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
};

// Read all
exports.listSanPham = async (req, res, next) => {
  try {
      // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, msg: 'Validation failed', errors: errors.array() });
    }

    const sanPhams = await SanPham.find().sort({ _id: -1 });
    if (sanPhams.length > 0) {
      res.json({ status: 200, msg: "Lấy dữ liệu sản phẩm thành công", data: sanPhams });
    } else {
      res.json({ status: 204, msg: "Không có dữ liệu sản phẩm", data: [] });
    }
  } catch (err) {
    res.json({ status: 500, msg: err.message, data: [] });
  }
};

// Read by ID
exports.getSanPhamById = async (req, res, next) => {
  try {
    const sanPham = await SanPham.findById(req.params.id);
    if (sanPham) {
      res.json({ status: 200, msg: "Lấy dữ liệu sản phẩm thành công", data: sanPham });
    } else {
      res.json({ status: 204, msg: "Không tìm thấy sản phẩm", data: null });
    }
  } catch (err) {
    res.json({ status: 500, msg: err.message, data: null });
  }
};

// Update by ID
exports.updateSanPham = async (req, res, next) => {
  try {
    const updatedData = {
      soLuong: req.body.soLuong,
      trangThai: req.body.trangThai || true,
      giaTien: req.body.giaTien,
      weight: req.body.weight,
      os: req.body.os,
      cpu: req.body.cpu,
      gpu: req.body.gpu,
      display: req.body.display,
      moTa: req.body.moTa,
      anh: req.body.anh || [],
    };

    await SanPham.updateOne({ _id: req.params.id }, updatedData);
    res.json({ status: 200, msg: "Sửa thông tin sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
};

// Delete by ID
exports.deleteSanPham = async (req, res, next) => {
  try {
    await SanPham.deleteOne({ _id: req.params.id });
    res.json({ status: 200, msg: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 500, msg: err.message });
  }
};

