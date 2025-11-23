import { v2 as cloudinary } from 'cloudinary';
import multer, { MulterError } from 'multer';
import type { Request, Response, NextFunction } from 'express';
import config from '../config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import AppError from './AppError';

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
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
            { width: 1200, height: 800, crop: 'limit' }, // Resize with aspect ratio
            { quality: 'auto' }, // Automatic quality optimization
            { format: 'webp' } // Convert to WebP for better performance
        ]
    })
});

// Multiple upload configurations
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 4 * 1024 * 1024, // 4MB per file to stay under Vercel's request cap
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
        if (!file) throw new Error('No file provided');
        const anyFile = file as any;
        const filePath = anyFile.path as string | undefined;
        const filePublicId = (anyFile.filename as string | undefined) || (anyFile.public_id as string | undefined);

        if (filePath && filePath.startsWith('http')) {
            return {
                url: filePath,
                publicId: filePublicId || '',
            };
        }

        if (!filePath) {
            throw new Error('File has no path. Ensure multer uses disk or cloudinary storage and the field name matches.');
        }

        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'nova-store',
            resource_type: 'auto',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
            transformation: [
                { width: 1200, height: 800, crop: 'limit' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error: any) {
        throw new AppError(`Error uploading to Cloudinary: ${error.message || 'Unknown error'}`, 500, 'CloudinaryError');
    }
};

// Upload multiple images to Cloudinary
export const uploadMultipleToCloudinary = async (files?: Express.Multer.File[] | null) => {
    try {
        if (!files || files.length === 0) return [];

        const anyFirst = files[0] as any;
        const alreadyOnCloudinary = anyFirst?.path && typeof anyFirst.path === 'string' && anyFirst.path.startsWith('http');
        if (alreadyOnCloudinary) {
            return files.map(f => {
                const af = f as any;
                return {
                    url: af.path as string,
                    publicId: (af.filename as string | undefined) || (af.public_id as string | undefined) || ''
                };
            });
        }

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
