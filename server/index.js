import mongoose from "mongoose";
import express from "express";
import usersRouter from "./routes/userRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import dotenv from "dotenv";
import chalk from "chalk";


const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_CON_URL, {
    serverSelectionTimeoutMS: 5000,
    useNewUrlParser: true,
},
    (err) => {
        if (err)
            console.log(chalk.redBright(`Error while connecting to database ${err}`));
    }
)

// New database connection
const db = await mongoose.connection;
db.on("error", (err) => console.error("connection error: " + err));
db.once("open", () => console.log(chalk.blueBright("Successfully connected to DB 🗃")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/users', usersRouter);
app.use("/vehicles", vehicleRoutes);

//SERVER
const port = process.env.SERVER_PORT || 5000;
const server = app.listen(port, () => console.log(chalk.hex("#FFA500").bold(`Listening on port ${port} 🚀`)))

process.on('unhandledRejection', (err) => {
    console.log(chalk.bgRedBright('UNHANDLED REJECTION! 💥 Shutting down...'));
    console.error(`${err.name}=>${err.message}`);
    server.close(() => {
        process.exit(1);
    });
})