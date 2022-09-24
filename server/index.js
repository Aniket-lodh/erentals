import mongoose from "mongoose";
import express from "express";
import usersRouter from "./routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_CON_URL, {
        serverSelectionTimeoutMS: 5000,
        useNewUrlParser: true,
    },
    (err) => {
        if (err)
            console.log(`Error while connecting to database ${err}`);
    }
    )

// New database connection
const db = await mongoose.connection;
db.on("error", (err) => console.error("connection error: " + err));
db.once("open", () => console.log("Connected Successfully to DB"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ROUTES
app.use('/users', usersRouter);


const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`))