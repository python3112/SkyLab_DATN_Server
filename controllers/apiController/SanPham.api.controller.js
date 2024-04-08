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
exports.getSanPhamById = async (req, res) => {
    try {
        const sanPham = await SanPham.findById(req.params.id);
        res.json(sanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Lấy sản phẩm theo hãng
exports.getSanPhamByIdHang = async (req, res) => {
    try {
        const sanPham = await SanPham.find({ idHangSx: req.params.id,trangThai:true });
        res.json(sanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSanPhamByCpu = async (req, res) => {
    try {
        const sanPham = await SanPham.find({ cpu: req.params.cpu,trangThai:true });
        res.json(sanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Tạo sản phẩm
exports.createSanPham = async (req, res) => {
    try {
        const {idHangSx,soLuong,tenSanPham,giaTien,
            cpu,soNhan,soLuongCPU,tocDoCPU,tocDoToiDa,boNhoDem,
            ram,loaiRam,tocDoBusRam,hoTroRamToiDa,rom,
            display,doPhanGiai,tanSoQuet,doPhuMau,congNgheManHinh,
            moTa,mauSac,gpu,congNgheAmThanh,
            congGiaoTiep,ketNoiKhongDay,webCam,tinhNangKhac,denBanPhim,
            kichThuocKhoiLuong,chatLieu,
            pin,congSuatSac,thoiDiemRaMat,baohanh,os,phuKien
        } = req.body;
        const files = req.files;
        if (!files) {
            return res.status(400).json({ message: 'Chưa có file upload' });
        }
        let imageUrlAnhSanPham;
        let imageUrlAnh;
        const fileAnh =[];
        for (const file of files) { 
            if (file.fieldname === 'anhSanPham') {
                imageUrlAnhSanPham = await uploadImage(file, nameFolder);
            } else if (file.fieldname === 'anh') {
                fileAnh.push(file);
            }
            imageUrlAnh = await uploadImages(fileAnh, nameFolder);
            // Xử lý các trường hoặc điều kiện khác nếu cần
        }
        //  Validate required fields
        // if (!tenSanPham || !giaTien) {
        //     return res.status(400).json({ message: "Tên sản phẩm và giá tiền là bắt buộc." });
        // }

        // Create new SanPham instance
        // const imageUrl = await uploadImages(files, nameFolder);
        console.log(req.body); 
        console.log(req.files);
        const newSanPham = new SanPham({
            idHangSx,soLuong,tenSanPham,giaTien,
            trangThai:true,
            anh: imageUrlAnh,
            anhSanPham:imageUrlAnhSanPham,
            cpu,soNhan,soLuongCPU,tocDoCPU,tocDoToiDa,boNhoDem,
            ram,loaiRam,tocDoBusRam,hoTroRamToiDa,rom,
            display,doPhanGiai,tanSoQuet,doPhuMau,congNgheManHinh,
            moTa,mauSac,gpu,congNgheAmThanh,
            congGiaoTiep,ketNoiKhongDay,webCam,tinhNangKhac,denBanPhim,
            kichThuocKhoiLuong,chatLieu,
            pin,congSuatSac,thoiDiemRaMat,baohanh,os,phuKien
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
        const {idHangSx,soLuong,tenSanPham,giaTien,trangThai,
            cpu,soNhan,soLuongCPU,tocDoCPU,tocDoToiDa,boNhoDem,
            ram,loaiRam,tocDoBusRam,hoTroRamToiDa,rom,
            display,doPhanGiai,tanSoQuet,doPhuMau,congNgheManHinh,
            moTa,mauSac,gpu,congNgheAmThanh,
            congGiaoTiep,ketNoiKhongDay,webCam,tinhNangKhac,denBanPhim,
            kichThuocKhoiLuong,chatLieu,
            pin,congSuatSac,thoiDiemRaMat,baohanh,os,phuKien
        } = req.body;
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
        existingSanPham.idHangSx = idHangSx || existingSanPham.idHangSx;
        existingSanPham.trangThai = trangThai || existingSanPham.trangThai;
        existingSanPham.soLuong = soLuong || existingSanPham.soLuong;
        existingSanPham.tenSanPham = tenSanPham || existingSanPham.tenSanPham;
        existingSanPham.giaTien = giaTien || existingSanPham.giaTien;
        existingSanPham.cpu = cpu || existingSanPham.cpu;
        existingSanPham.soNhan = soNhan || existingSanPham.soNhan;
        existingSanPham.soLuongCPU = soLuongCPU || existingSanPham.soLuongCPU;
        existingSanPham.tocDoCPU = tocDoCPU || existingSanPham.tocDoCPU;
        existingSanPham.tocDoToiDa = tocDoToiDa || existingSanPham.tocDoToiDa;
        existingSanPham.boNhoDem = boNhoDem || existingSanPham.boNhoDem;
        existingSanPham.ram = ram || existingSanPham.ram;
        existingSanPham.loaiRam = loaiRam || existingSanPham.loaiRam;
        existingSanPham.tocDoBusRam = tocDoBusRam || existingSanPham.tocDoBusRam;
        existingSanPham.hoTroRamToiDa = hoTroRamToiDa || existingSanPham.hoTroRamToiDa;
        existingSanPham.rom = rom || existingSanPham.rom;
        existingSanPham.display = display || existingSanPham.display;
        existingSanPham.doPhanGiai = doPhanGiai || existingSanPham.doPhanGiai;
        existingSanPham.tanSoQuet = tanSoQuet || existingSanPham.tanSoQuet;
        existingSanPham.doPhuMau = doPhuMau || existingSanPham.doPhuMau;
        existingSanPham.moTa = moTa || existingSanPham.moTa;
        existingSanPham.congNgheManHinh = congNgheManHinh || existingSanPham.congNgheManHinh;
        existingSanPham.mauSac = mauSac || existingSanPham.mauSac;
        existingSanPham.gpu = gpu || existingSanPham.gpu;
        existingSanPham.congGiaoTiep = congGiaoTiep || existingSanPham.congGiaoTiep;
        existingSanPham.ketNoiKhongDay = ketNoiKhongDay || existingSanPham.ketNoiKhongDay;
        existingSanPham.congNgheAmThanh = congNgheAmThanh || existingSanPham.congNgheAmThanh;
        existingSanPham.webCam = webCam || existingSanPham.webCam;
        existingSanPham.tinhNangKhac = tinhNangKhac || existingSanPham.tinhNangKhac;
        existingSanPham.denBanPhim = denBanPhim || existingSanPham.denBanPhim;
        existingSanPham.kichThuocKhoiLuong = kichThuocKhoiLuong || existingSanPham.kichThuocKhoiLuong;
        existingSanPham.chatLieu = chatLieu || existingSanPham.chatLieu;
        existingSanPham.pin = pin || existingSanPham.pin;
        existingSanPham.congSuatSac = congSuatSac || existingSanPham.congSuatSac;
        existingSanPham.thoiDiemRaMat = thoiDiemRaMat || existingSanPham.thoiDiemRaMat;
        existingSanPham.baohanh = baohanh || existingSanPham.baohanh;
        existingSanPham.os = os || existingSanPham.os;
        existingSanPham.phuKien = phuKien || existingSanPham.phuKien;
        existingSanPham.anh = imageUrl || existingSanPham.anh;
        const updatedSanPham = await existingSanPham.save();
        res.json(updatedSanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Tìm kiếm sản phẩm theo tên gần giống
exports.searchSanPham = async (req, res) => {
    try {
        // Lấy tên sản phẩm từ request body
        const { tenSanPham } = req.body;
        // Tìm kiếm các sản phẩm có tên gần giống với tên được gửi lên
        const sanPham = await SanPham.find({ tenSanPham: { $regex: tenSanPham, $options: 'i' } });
        res.json(sanPham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
