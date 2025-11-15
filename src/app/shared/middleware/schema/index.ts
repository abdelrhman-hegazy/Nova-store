
import Joi from "joi";

export const emailSchema = Joi.object({
    email: Joi.string().email().min(5).max(100).required(),
    isAdmin: Joi.boolean().required()
});

export const verificationSchema = Joi.object({
    email: Joi.string().email().min(5).max(100).required(),
    code: Joi.string().length(6).required()
});

export const productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    categoryId: Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    discount: Joi.number().min(0).max(100).optional().default(0),
    details: Joi.string().max(1000).optional(),
    stock: Joi.number().integer().min(0).optional().default(1)
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    categoryId: Joi.string().optional(),
    price: Joi.number().positive().precision(2).optional(),
    discount: Joi.number().min(0).max(100).optional(),
    details: Joi.string().max(1000).optional(),
    stock: Joi.number().integer().min(0).optional()
});
