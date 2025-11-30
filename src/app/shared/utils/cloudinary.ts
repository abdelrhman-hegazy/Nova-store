import multer from "multer";
import AppError from "./AppError";
import { v2 as cloudinary } from "cloudinary";
import config from "../config";

interface CloudinaryUploadResponse {
    url: string;
    publicId: string;
}

const memoryStorage = multer.memoryStorage();

export const upload = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 4 * 1024 * 1024, // 4MB
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new AppError("Only image files are allowed!", 400, "bad_request"));
        }
        cb(null, true);
    },
});


cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
});

export const uploadToCloudinary = async (file: Express.Multer.File): Promise<CloudinaryUploadResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: "nova-store",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) {
                        reject(new AppError("Cloudinary upload failed", 500, "cloud_error"));
                    } else {
                        if (!result?.secure_url || !result?.public_id) {
                            reject(new AppError("Cloudinary upload failed: Missing URL or public ID", 500, "cloud_error"));
                            return;
                        }
                        resolve({
                            url: result.secure_url,
                            publicId: result.public_id,
                        });
                    }
                }
            )
            .end(file.buffer); // مهم جداً — Vercel لا يدعم ملفات في disk
    });

};

export const deleteFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        throw new AppError("Failed to delete image from Cloudinary", 500, "cloud_error");
    }
};

export const uploadMultipleToCloudinary = async (files: Express.Multer.File[]): Promise<Array<{ url: string; publicId: string }>> => {
    try {
        const uploadPromises = files.map(file =>
            uploadToCloudinary(file).catch(error => {
                console.error('Error uploading file to Cloudinary:', error);
                return null;
            })
        );

        const results = await Promise.all(uploadPromises);
        return results.filter((result): result is { url: string; publicId: string } => result !== null);
    } catch (error) {
        console.error('Error in uploadMultipleToCloudinary:', error);
        throw new AppError("Failed to upload one or more files to Cloudinary", 500, "cloud_error");
    }
};
