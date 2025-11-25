"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.deleteMultipleFromCloudinary = exports.uploadMultipleToCloudinary = exports.uploadToCloudinary = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("./AppError"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.cloudName,
    api_key: config_1.default.cloudinary.apiKey,
    api_secret: config_1.default.cloudinary.apiSecret
});
const memoryStorage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage: memoryStorage,
    limits: {
        fileSize: 4 * 1024 * 1024,
        files: 10
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
        }
    }
});
const uploadToCloudinary = async (file) => {
    try {
        if (!file)
            throw new Error('No file provided');
        return new Promise((resolve, reject) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            cloudinary_1.v2.uploader.upload(dataURI, {
                folder: 'nova-store',
                resource_type: 'auto',
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                transformation: [
                    { width: 1200, height: 800, crop: 'limit' },
                    { quality: 'auto' },
                    { format: 'webp' }
                ]
            }, (error, result) => {
                if (error) {
                    reject(new AppError_1.default(`Cloudinary upload failed: ${error.message}`, 500, 'CloudinaryError'));
                }
                else if (result) {
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                    });
                }
                else {
                    reject(new AppError_1.default('Cloudinary upload returned no result', 500, 'CloudinaryError'));
                }
            });
        });
    }
    catch (error) {
        throw new AppError_1.default(`Error uploading to Cloudinary: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
const uploadMultipleToCloudinary = async (files) => {
    try {
        if (!files || files.length === 0)
            return [];
        const uploadPromises = files.map(file => (0, exports.uploadToCloudinary)(file));
        const results = await Promise.all(uploadPromises);
        return results;
    }
    catch (error) {
        throw new AppError_1.default(`Error uploading multiple files: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
const deleteMultipleFromCloudinary = async (publicIds) => {
    try {
        const deletePromises = publicIds.map(publicId => cloudinary_1.v2.uploader.destroy(publicId));
        await Promise.all(deletePromises);
    }
    catch (error) {
        throw new AppError_1.default(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};
exports.deleteMultipleFromCloudinary = deleteMultipleFromCloudinary;
const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary_1.v2.uploader.destroy(publicId);
    }
    catch (error) {
        throw new AppError_1.default(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
