const { body } = require('express-validator');

exports.validateSanPham = [
  body('soLuong').isInt().notEmpty(),
  body('trangThai').optional().isBoolean(),
  body('giaTien').isFloat().notEmpty(),
  body('weight').isFloat().notEmpty(),
  body('os').isString().notEmpty(),
  body('cpu').isString().notEmpty(),
  body('gpu').isString().notEmpty(),
  body('display').isString().notEmpty(),
  body('moTa').isString().notEmpty(),
  body('anh').isArray(),
];

exports.validateTheloaiSp = [
  body('idSanpham').isMongoId().notEmpty(),
  body('tenTheLoai').isString().notEmpty(),
  body('trangThai').optional().isBoolean(),
];
