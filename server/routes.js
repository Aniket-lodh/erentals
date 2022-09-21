import express from "express";
import { user as UserModule } from "./models/user_model.js";
import bodyParser from "body-parser";

export const app = express();

// Body parser is the middleware that handles the data
//  before passing it to the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTES
app.get("/", (req, res) => {
    res.json("This is the home page of the server. Welcome!")
})

app.post("/users/new", async (req, res) => {
    const user = new UserModule(req.body);
    try {
        const val = await user.save();
        res.send(val);
    } catch (error) {
        var result={
            status:500,
            name:error._message,
            message:error["errors"]["username"].message
        }

        res.status(500).send(result);
    }
})

app.get("/users", async (req, res) => {
    const users = await UserModule.find({});
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

