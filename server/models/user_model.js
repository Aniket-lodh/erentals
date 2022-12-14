import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

/**
 * The format of the user Model.
 * Creating a new instance of the mongoose schema class
 **/
const userSchema = new mongoose.Schema({
    user_type: {
        type: String,
        required: [true, "user type is required!"],
        enum: ["customer", "vendor", "Customer", "Vendor"],//enum checks if the received parameter is one of these 2 options or not.
        default: "customer"
    },
    username: {
        type: String,
        required: [true, "user name is required"],
        minlength: [6, 'Minimum length 6 characters'],
        maxlength: [15, "Maximum length 15 characters"]
    },
    profilephoto: String,
    gender: {
        type: String,
        required: [true, "gender is required"],
        enum: ["male", "female", "others"],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        minlength: [10, "Minimum length 10"],
        maxlength: [10, "Maximum length 10"]
    },
    address: {
        type: String,
        required: [true, "address cannot be empty"],
    },
    passcode: {
        type: String,
        required: [true, "password cannot be empty"],
        minlength: 10,
        select: false //hides the password 
    },
    passcodeChangedAt: {
        type: Date,
    },
    listings: {
        type: [ObjectId],
        default: undefined
    },
    createdAt: {
        type: String,
        default: new Date()
    },
    updatedAt: {
        type: String
    },
});

userSchema.pre('save', async function (next) {
    this.passcode = await bcrypt.hash(this.passcode, 10);
    next()
})

userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};
// 1st parameter in model stands for the database table name in mongodb
export const user = mongoose.model('user', userSchema);