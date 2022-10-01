import express from "express";
import {
    getAllUsers,
    createUser,
    getUser,
    findUser,
    updateUser,
    deleteUser
} from "../controllers/user_controller.js";

const router = express.Router();

// All the available user routes
router.route("/")
    .get(getAllUsers)
    .post(createUser);

router.route("/:id")
    .get(findUser, getUser)
    .patch(findUser, updateUser)
    .delete(findUser, deleteUser);

// router.route("/login")
//     .get(loginUser);

export default router;
