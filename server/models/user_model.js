import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

/**
 * The format of the user Model.
 * Creating a new instance of the mongoose schema class
 **/
const userSchema = new mongoose.Schema({
    user_type: {
        type: String,
        required: [true, "user type is required!"],
        enum: ["customer", "vendor", "Customer", "Vendor"] //enum checks if the received parameter is one of these 2 options or not.
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
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre('save', async function (next) {
    this.passcode = await bcrypt.hash(this.passcode, 12);
    next()
})

// 1st parameter in model stands for the database table name in mongodb
export const user = mongoose.model('user', userSchema);