import mongoose from "mongoose";

/**
 * The format of the user Model
 * Creating a new instance of the mongoose schema class
 **/
const userSchema = new mongoose.Schema({
    username: { type: String, required: "user name cannot be left blank"},
    gender: { type: String, required: "gender cannot be left blank" },
    email: { type: String, required: "email cannot be left blank" },
    phone: { type: Number, min: 10, required: "Phone cannot be left blank" }
});
// 1st parameter in model stands for the database table name in mongodb
export const user = mongoose.model('users', userSchema);