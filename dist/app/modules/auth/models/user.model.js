"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    mobileNumber: {
        type: String,
        maxlength: [18, "mobileNumber can't be greater than 18 characters"],
        trim: true,
    },
    username: {
        type: String,
        trim: true,
        default: null,
        minlength: [3, "Name can't be smaller than 3 characters"],
        maxlength: [15, "Name can't be greater than 15 characters"],
    },
    nationality: { type: String, trim: true },
    dateOfBirth: { type: String, maxlength: 15, trim: true },
    verificationCode: { type: String, trim: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, required: true },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", UserSchema);
