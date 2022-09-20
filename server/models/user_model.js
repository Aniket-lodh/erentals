import mongoose from "mongoose";
const Schema = mongoose.Schema;

// The format of the user Model
//  Creating a new instance of the mongoose schema class
const userSchema = new Schema({
    username: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, min: 10,reuired:true }
});
const user  = mongoose.model('user', userSchema);
export default user;
// module.exports=user