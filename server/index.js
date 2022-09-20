import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from "./controllers/user_controller.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connecting db with mongoose
const connection = mongoose.connection
mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
})
connection.once('open', () => {
    console.log("DB connected.");
})

app.get("/", (req, res) => {
    res.json("Hello this is the backend");
})
app.use("/users", userRouter);
// Starting the dev server
app.listen(PORT, () => {
    console.log(`Connected to the server and listening on ${PORT}`);
})