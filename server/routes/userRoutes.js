import express from "express";
import { verifyToken, verifyUser } from "../controllers/authController.js";
import {
    getAllUsers,
    createUser,
    getProfile,
    findUser,
    updateUser,
    deleteUser,
    loginUser

} from "../controllers/user_controller.js";

const router = express.Router();

// All the available user routes
router.route("/")
    .get(getAllUsers)
    .post(createUser); //Signup user

router.route("/:id")
    .patch(findUser, updateUser)
    .delete(findUser, deleteUser);

router.route("/profile")
    .get(verifyToken, verifyUser, getProfile); //get user profile

router.route('/login')
    .post(loginUser) //Signin user

export default router;
