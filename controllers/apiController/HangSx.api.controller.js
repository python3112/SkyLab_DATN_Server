const Hangsx = require('../../models/Hangsx');
const {uploadImage} = require('../../middlewares/upload.image.firebase');
    // Lấy tất cả các hãng sản xuất
exports.getAllHangsx = async (req, res) => {
    try {
      const hangsx = await Hangsx.find();
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
        return res.status(400).json({ message: 'No file uploaded.' });
      }
  
      const imageUrl = await uploadImage(file);
  
      const newHangsx = new Hangsx({
        tenHangSx,
        trangThai,
        imageLogo: imageUrl,
      });
  
      const savedHangsx = await newHangsx.save();
  
      return res.status(201).json(savedHangsx);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  };