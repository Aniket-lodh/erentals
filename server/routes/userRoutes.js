import express from "express";
import { user as UserModule } from "../models/user_model.js";
import getErrors from "../elog.js";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import {
    getAllUsers,
    createUser,
    getUser,
    findUser,
    updateUser,
    deleteUser
} from "../controllers/user_controller.js";

const router = express.Router();

// Getting all
router.route("/")
    .get(getAllUsers)
    .post(createUser);

router.route("/:id")
    .get(findUser, getUser)
    .patch(findUser,updateUser)
    .delete(findUser,deleteUser);
    
export default router;
