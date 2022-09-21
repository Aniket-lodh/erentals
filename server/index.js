import mongoose from "mongoose";
import { app } from "./routes.js";

mongoose.connect("mongodb://localhost:27017/erentals", {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
}).catch(err => console.log(err.reason))

// New database connection
const db = mongoose.connection;
db.on("error", () => console.error.bind(console, "connection error: "));
db.once("open", () => { console.log("Connected Successfully to DB") })

app.listen(8000, () => console.log("Connected to server."))