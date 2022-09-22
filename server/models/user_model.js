import mongoose from "mongoose";

/**
 * The format of the user Model
 * Creating a new instance of the mongoose schema class
 **/
const userSchema = new mongoose.Schema({
    user_type: {
        type: String,
        required: [true, "user type is required!"],
        enum: ["customer", "vendor"] //enum checks if the received parameter is one of these 2 options or not.
    },
    username: {
        type: String,
        required: [true, "user name is required"],
        minlength: [6, 'Minimun length 6 characters'],
        maxlength: [15, "Maximum length 15 characters"]
    },
    gender: {
        type: String,
        required: [true, "gender is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        minlength: [10, "Minimum length 10"],
        maxlength: [10, "Maximum length 10"]
    },
    address: {
        type: String,
        required: "address cannot be empty"
    },
    passcode: {
        type: String,
        required: [true, "password cannot be empty"],
        minlength: [10, 'Minimun code length 10 characters']
    }
});
// 1st parameter in model stands for the database table name in mongodb
export const user = mongoose.model('users', userSchema);