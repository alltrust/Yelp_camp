const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME1,
    api_key: process.env.CLOUDINARY_KEY1,
    api_secret: process.env.CLOUD_SECRET1
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}