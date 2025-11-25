import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
import AppError from './AppError';

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
});

// Use memory storage for Vercel compatibility
const memoryStorage = multer.memoryStorage();

// Multiple upload configurations
export const upload = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 4 * 1024 * 1024, // 4MB per file
        files: 10 // Maximum 10 files
    },
    fileFilter: (req, file, cb) => {
        // Validate file types
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
        }
    }
});

// Upload single image to Cloudinary from buffer
export const uploadToCloudinary = async (file: Express.Multer.File) => {
    try {
        if (!file) throw new Error('No file provided');

        return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
            // Convert buffer to base64
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;

            cloudinary.uploader.upload(
                dataURI,
                {
                    folder: 'nova-store',
                    resource_type: 'auto',
                    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                    transformation: [
                        { width: 1200, height: 800, crop: 'limit' },
                        { quality: 'auto' },
                        { format: 'webp' }
                    ]
                },
                (error, result) => {
                    if (error) {
                        reject(new AppError(`Cloudinary upload failed: ${error.message}`, 500, 'CloudinaryError'));
                    } else if (result) {
                        resolve({
                            url: result.secure_url,
                            publicId: result.public_id,
                        });
                    } else {
                        reject(new AppError('Cloudinary upload returned no result', 500, 'CloudinaryError'));
                    }
                }
            );
        });
    } catch (error: any) {
        throw new AppError(`Error uploading to Cloudinary: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};

// Upload multiple images to Cloudinary
export const uploadMultipleToCloudinary = async (files?: Express.Multer.File[] | null) => {
    try {
        if (!files || files.length === 0) return [];

        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error: any) {
        throw new AppError(`Error uploading multiple files: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};

// Delete multiple files from Cloudinary
export const deleteMultipleFromCloudinary = async (publicIds: string[]) => {
    try {
        const deletePromises = publicIds.map(publicId =>
            cloudinary.uploader.destroy(publicId)
        );
        await Promise.all(deletePromises);
    } catch (error: any) {
        throw new AppError(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};

// Delete single file from Cloudinary
export const deleteFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
        throw new AppError(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};