import { Schema , model } from "mongoose";
import { IUserDocument } from "../interfaces/user.interface";

const UserSchema= new Schema({
    email: {
        type:String,
        required: [true, "email is required"],
        trim: true,
        unique: [true, "email must be unique"],
        lowercase: true
    },
    
    mobileNumber: {
        type: String,
        maxlength: [18, "mobileNumber can't be greater than 18 characters"],
        trim: true,
        required: false,
    },
    username: {
        type: String,
        trim:true,
        default: null,
        minLength: [3, "Name can't be smaller than 3 characters"],
        maxLength: [15, "Name can't be greater than 15 characters"],
    },
    nationality:{
        type: String,
        trim: true,
        required: false,
    },
    dateOfBirth:{
        type: String,
        maxlength: 15,
        trim:true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps: true}
)

const User = model<IUserDocument>("User",UserSchema)
export {User}