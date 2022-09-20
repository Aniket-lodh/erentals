import { Router } from "express";
import user from "../models/user_model.js";

const router = new Router();
router.route("/new").post((req, res) => {
        const newUser = new user(req.body);
        newUser.save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json("Error! " + err))
    })
export default router