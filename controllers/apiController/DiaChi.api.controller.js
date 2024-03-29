const Level1Model = require('../../models/DiaChiHC');
const fs = require('fs');
const path = require('path');

// Đường dẫn đến tệp JSON trong thư mục public
const jsonFilePath = path.join(__dirname, '../../public/dvhcvn.json');

// Đọc dữ liệu từ tệp JSON
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const data = JSON.parse(jsonData);

// Controller để lấy ra tất cả các level1
exports.getAllLevel1 = async (req, res) => {
    try {
        // Truy cập vào mảng data và sau đó chọn ra các trường id, name, và type từ mỗi object trong mảng dữ liệu
        const level1Data = data.data.map(level1 => ({
            id: level1.level1_id,
            name: level1.name,
            type: level1.type
        }));
        // Trả về mảng các level 1 chỉ với các trường id, name, và type
        res.json(level1Data);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Controller để lấy ra các level2 của một level1 cụ thể
exports.getLevel2OfLevel1 = async (req, res) => {
    const level1Id = req.params.level1Id;
    try {
        const level1 = data.data.find(item => item.level1_id === level1Id);
        if (!level1) {
            return res.status(404).send('Level1 not found');
        }
        // Trả về mảng các level 2 của level 1 chỉ với các trường id, name, và type
        res.json(level1.level2s.map(level2 => ({
            id: level2.level2_id,
            name: level2.name,
            type: level2.type
        })));
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controller để lấy ra các level3 của một level2 cụ thể của một level1 cụ thể
exports.getLevel3OfLevel2 = async (req, res) => {
    const { level1Id, level2Id } = req.params;
    try {
        const level1 = data.data.find(item => item.level1_id === level1Id);
        if (!level1) {
            return res.status(404).send('Level1 not found');
        }
        const level2 = level1.level2s.find(level2 => level2.level2_id === level2Id);
        if (!level2) {
            return res.status(404).send('Level2 not found');
        }
        // Trả về mảng các level 3 của level 2 chỉ với các trường id, name, và type
        res.json(level2.level3s.map(level3 => ({
            id: level3.level3_id,
            name: level3.name,
            type: level3.type
        })));
    } catch (error) {
        res.status(500).send(error);
    }
};
