const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/DATN_Server', {
      //'mongodb+srv://root:123@skylap.5xgnlru.mongodb.net/sky_lap?retryWrites=true&w=majority&appName=SkyLap'
     
    });
    console.log('Kết nối thành công đến MongoDB');
  } catch (error) {
    console.error('Lỗi kết nối đến MongoDB:', error);
  }
};

module.exports = connectDB;
