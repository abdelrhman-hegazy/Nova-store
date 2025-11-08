
import Joi from "joi";

export const emailSchema = Joi.object({
    email: Joi.string().email().min(5).max(100).required()
});

export const verificationSchema = Joi.object({
    email: Joi.string().email().min(5).max(100).required(),
    code: Joi.string().length(6).required()
}); 
