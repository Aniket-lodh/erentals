import express from "express"
import { getAllVehicles, createVehicle, getVehicle, delVehicle } from "../controllers/vehicle_controller.js";
const router = express.Router();

// All the available user routes
router.route("/")
    .get(getAllVehicles)
    .post(createVehicle);

router.route("/:id")
    .get(getVehicle)
    .patch()
    .delete(delVehicle);

export default router;
