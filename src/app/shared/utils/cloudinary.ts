import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
});

// Create upload middleware for multiple files
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async () => ({
        folder: 'nova-store',
        resource_type: 'auto',
        transformation: [
            { width: 1200, height: 800, crop: 'limit' }, // Resize with aspect ratio
            { quality: 'auto' }, // Automatic quality optimization
            { format: 'webp' } // Convert to WebP for better performance
        ]
    })
});

// Multiple upload configurations
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
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

// Upload single image to Cloudinary
export const uploadToCloudinary = async (file: Express.Multer.File) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'nova-store',
            resource_type: 'auto',
            transformation: [
                { width: 1200, height: 800, crop: 'limit' }, // Resize with aspect ratio
                { quality: 'auto' }, // Automatic quality optimization
                { format: 'webp' } // Convert to WebP for better performance
            ]
        });
        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error: any) {
        throw new Error(`Error uploading to Cloudinary: ${error.message || 'Unknown error'}`);
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
        throw new Error(`Error uploading multiple files: ${error.message || 'Unknown error'}`);
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
        throw new Error(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`);
    }
};

// Delete single file from Cloudinary
export const deleteFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
        throw new Error(`Error deleting from Cloudinary: ${error.message || 'Unknown error'}`);
    }
};