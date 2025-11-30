"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleToCloudinary = exports.deleteFromCloudinary = exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const AppError_1 = __importDefault(require("./AppError"));
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const memoryStorage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage: memoryStorage,
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new AppError_1.default("Only image files are allowed!", 400, "bad_request"));
        }
        cb(null, true);
    },
});
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.cloudName,
    api_key: config_1.default.cloudinary.apiKey,
    api_secret: config_1.default.cloudinary.apiSecret,
});
const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({
            folder: "nova-store",
            resource_type: "image",
        }, (error, result) => {
            if (error) {
                reject(new AppError_1.default("Cloudinary upload failed", 500, "cloud_error"));
            }
            else {
                if (!result?.secure_url || !result?.public_id) {
                    reject(new AppError_1.default("Cloudinary upload failed: Missing URL or public ID", 500, "cloud_error"));
                    return;
                }
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            }
        })
            .end(file.buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary_1.v2.uploader.destroy(publicId);
    }
    catch (err) {
        throw new AppError_1.default("Failed to delete image from Cloudinary", 500, "cloud_error");
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
const uploadMultipleToCloudinary = async (files) => {
    try {
        const uploadPromises = files.map(file => (0, exports.uploadToCloudinary)(file).catch(error => {
            console.error('Error uploading file to Cloudinary:', error);
            return null;
        }));
        const results = await Promise.all(uploadPromises);
        return results.filter((result) => result !== null);
    }
    catch (error) {
        console.error('Error in uploadMultipleToCloudinary:', error);
        throw new AppError_1.default("Failed to upload one or more files to Cloudinary", 500, "cloud_error");
    }
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
