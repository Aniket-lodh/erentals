import express from "express";
import { verifyToken, verifyUser } from "../controllers/authController.js";
import {
    getAllUsers,
    createUser,
    getProfile,
    updateUser,
    deleteUser,
    loginUser

} from "../controllers/user_controller.js";

const router = express.Router();

// All the available user routes
router.route("/")
    .get(getAllUsers)
    .post(createUser); //Signup user

router.route('/login')
    .post(loginUser) //Signin user

router.route("/:id") //FIXME:update the :id to me
    .patch(verifyToken, verifyUser, updateUser) //update the user
    .delete(verifyToken, verifyUser, deleteUser); //delete the user

router.route("/profile")
    .get(verifyToken, verifyUser, getProfile); //get user profile

export default router;
