"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMulterErrors = exports.deleteFromCloudinary = exports.deleteMultipleFromCloudinary = exports.uploadMultipleToCloudinary = exports.uploadToCloudinary = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importStar(require("multer"));
const config_1 = __importDefault(require("../config"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.cloudName,
    api_key: config_1.default.cloudinary.apiKey,
    api_secret: config_1.default.cloudinary.apiSecret
});
console.log("start///////////");
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async () => ({
        folder: 'nova-store',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { format: 'webp' }
        ]
    })
});
console.log("storage///////////1", storage);
exports.upload = (0, multer_1.default)({
    storage: storage,
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
console.log("upload///////////2", exports.upload);
console.log('Cloudinary configured successfully');
const uploadToCloudinary = async (file) => {
    try {
        if (!file)
            throw new Error('No file provided');
        const anyFile = file;
        const filePath = anyFile.path;
        const filePublicId = anyFile.filename || anyFile.public_id;
        if (filePath && filePath.startsWith('http')) {
            return {
                url: filePath,
                publicId: filePublicId || '',
            };
        }
        if (!filePath) {
            throw new Error('File has no path. Ensure multer uses disk or cloudinary storage and the field name matches.');
        }
        console.log("filePath/////////4 ", filePath);
        const result = await cloudinary_1.v2.uploader.upload(filePath, {
            folder: 'nova-store',
            resource_type: 'auto',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
            transformation: [
                { width: 1200, height: 800, crop: 'limit' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        });
        console.log("result///////////5", result);
        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    }
    catch (error) {
        throw new Error(`Error uploading to Cloudinary: ${error.message || 'Unknown error'}`);
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
const uploadMultipleToCloudinary = async (files) => {
    try {
        if (!files || files.length === 0)
            return [];
        const anyFirst = files[0];
        const alreadyOnCloudinary = anyFirst?.path && typeof anyFirst.path === 'string' && anyFirst.path.startsWith('http');
        if (alreadyOnCloudinary) {
            return files.map(f => {
                const af = f;
                return {
                    url: af.path,
                    publicId: af.filename || af.public_id || ''
                };
            });
        }
        const uploadPromises = files.map(file => (0, exports.uploadToCloudinary)(file));
        const results = await Promise.all(uploadPromises);
        return results;
    }
    catch (error) {
        throw new Error(`Error uploading multiple files: ${error.message || 'Unknown error'}`);
    }
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
const deleteMultipleFromCloudinary = async (publicIds) => {
    try {
        const deletePromises = publicIds.map(publicId => cloudinary_1.v2.uploader.destroy(publicId));
        await Promise.all(deletePromises);
    }
    catch (error) {
        throw new Error(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`);
    }
};
exports.deleteMultipleFromCloudinary = deleteMultipleFromCloudinary;
const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary_1.v2.uploader.destroy(publicId);
    }
    catch (error) {
        throw new Error(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`);
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
const handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer_1.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            status: 'fail',
            message: 'File too large. Max size is 4MB per file.',
            error: err,
        });
    }
    if (typeof err?.message === 'string' && err.message.includes('Unexpected end of form')) {
        return res.status(413).json({
            status: 'fail',
            message: 'Upload aborted. Request body too large for serverless runtime.',
            error: err,
        });
    }
    if (err instanceof multer_1.MulterError) {
        return res.status(400).json({
            status: 'fail',
            message: 'Upload failed.',
            error: err,
        });
    }
    return next(err);
};
exports.handleMulterErrors = handleMulterErrors;
