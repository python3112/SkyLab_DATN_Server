const { admin } = require('./firebase.config');

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const bucket = admin.storage().bucket();
    const fileName = Date.now() + '_' + file.originalname;

    const fileUpload = bucket.file(fileName);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      predefinedAcl: 'publicRead', 
    });

    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.on('finish', () => {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(imageUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadImage };