"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const utils_1 = require("../../../shared/utils");
const category_repository_1 = require("../repository/category.repository");
const cloudinary_1 = require("../../../shared/utils/cloudinary");
exports.createCategory = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { name } = req.body;
    const image = await (0, cloudinary_1.uploadToCloudinary)(req.file);
    const category = await category_repository_1.categoryRepository.create({ name, image });
    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: {
            category,
        },
    });
});
