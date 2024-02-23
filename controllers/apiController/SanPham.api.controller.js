const { Shop } = require('../../models/Shop');
const { SanPham } = require('../../models/SanPham');
const { uploadImage, deleteImage, uploadImages } = require('../../middlewares/upload.image.firebase');
const nameFolder = 'SanPham';

// Lấy tất cả sản phẩm
exports.getAllSanPham = async (req, res) => {
    try {
        const sanPham = await SanPham.find({ trangThai: true });
        res.json(sanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Lấy sản phẩm theo id
exports.getSanPhamById= async (req, res) => {
    try {
        const sanPham = await SanPham.findById(req.params.id);
        res.json(sanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Lấy sản phẩm theo Shop
exports.getSanPhamByIdShop = async (req, res) => {
    try {
        const sanPham = await SanPham.find({ idShop: req.params.id });
        res.json(sanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo sản phẩm
exports.createSanPham = async (req, res) => {
    try {
        const { idShop, soLuong, tenSanPham, trangThai, giaTien, chieuCao, chieuRong, trongLuong, ram, rom,
            baohanh, os, cpu, gpu, pin, display, moTa, phuKien, mauSac } = req.body;
        const files = req.files;
        if (!files) {
            return res.status(400).json({ message: 'Chưa có file upload' });
        }
        //  Validate required fields
        // if (!tenSanPham || !giaTien) {
        //     return res.status(400).json({ message: "Tên sản phẩm và giá tiền là bắt buộc." });
        // }

        // Create new SanPham instance
        const imageUrl = await uploadImages(files, nameFolder);
        const newSanPham = new SanPham({
            idShop, 
            soLuong,
            tenSanPham,
            trangThai,
            giaTien,
            chieuCao,
            chieuRong,
            trongLuong,
            ram,
            rom,
            baohanh,
            os,
            cpu,
            gpu,
            pin,
            display,
            moTa,
            phuKien,
            mauSac,
            anh: imageUrl
        });
        const savedSanPham = await newSanPham.save();

        res.status(201).json(savedSanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sửa thông tin sản phẩm theo id
exports.updateSanPhamById = async (req, res) => {
    try {
        const { soLuong, tenSanPham, trangThai, giaTien, chieuCao, chieuRong, trongLuong, ram, rom,
            baohanh, os, cpu, gpu, pin, display, moTa, phuKien, mauSac } = req.body;
            const files = req.files;
        // Kiểm tra xem sản phẩm có tồn tại hay không
        const existingSanPham = await SanPham.findById(req.params.id);
        if (!existingSanPham) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
        // Nếu có files được gửi lên, thì cập nhật ảnh mới
        let imageUrl = [];
        imageUrl = existingSanPham.anh;
        if (files.length > 0) {
            imageUrl = await uploadImages(files, nameFolder);
        }
        // Cập nhật thông tin sản phẩm
        existingSanPham.soLuong = soLuong || existingSanPham.soLuong;
        existingSanPham.tenSanPham = tenSanPham || existingSanPham.tenSanPham;
        existingSanPham.trangThai = trangThai || existingSanPham.trangThai;
        existingSanPham.giaTien = giaTien || existingSanPham.giaTien;
        existingSanPham.chieuCao = chieuCao || existingSanPham.chieuCao;
        existingSanPham.chieuRong = chieuRong || existingSanPham.chieuRong;
        existingSanPham.trongLuong = trongLuong || existingSanPham.trongLuong;
        existingSanPham.ram = ram || existingSanPham.ram;
        existingSanPham.rom = rom || existingSanPham.rom;
        existingSanPham.baohanh = baohanh || existingSanPham.baohanh;
        existingSanPham.os = os || existingSanPham.os;
        existingSanPham.cpu = cpu || existingSanPham.cpu;
        existingSanPham.gpu = gpu || existingSanPham.gpu;
        existingSanPham.pin = pin || existingSanPham.pin;
        existingSanPham.display = display || existingSanPham.display;
        existingSanPham.moTa = moTa || existingSanPham.moTa;
        existingSanPham.phuKien = phuKien || existingSanPham.phuKien;
        existingSanPham.mauSac = mauSac || existingSanPham.mauSac;
        existingSanPham.anh = imageUrl || existingSanPham.anh;

        const updatedSanPham = await existingSanPham.save();
        res.json(updatedSanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
