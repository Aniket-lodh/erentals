import express from "express"
import { getAllVehicles, createVehicle, getVehicle, delVehicle } from "../controllers/vehicle_controller.js";
import { verifyToken, verifyUser } from "../controllers/authController.js";

const router = express.Router();

// All the available user routes
router.route("/")
    .get(getAllVehicles)
    .post(verifyToken, verifyUser, createVehicle);

router.route("/:id")
    .get(verifyToken, verifyUser, getVehicle)
    // .patch(verifyToken, verifyUser, updateVehicle)
    .delete(verifyToken, verifyUser, delVehicle);

export default router;
