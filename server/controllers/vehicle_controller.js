import { user } from "../models/user_model.js";
import { Vehicle } from "../models/vehicle_model.js";
import { ObjectId } from "mongodb";

/**
 * Get all the available vehicles from the database
 * @param req 
 * @param res
 * @returns All the vehicles if they exists in the database
**/
export const getAllVehicles = async (req, res, next) => {
    const vehicles = await Vehicle.find();
    if (!vehicles) return res.status(200).send({ status: 200, message: "No available vehicles found.", data: null })
    res.status(200).send({ status: 200, message: "Successfully retreived", data: vehicles });
}
/**
 * Get a specific vehicle from the database
 * @param req.params.id
 * @returns exisiting vehicle if exists in the database else err message.
**/
export const getVehicle = async (req, res, next) => {
    const foundVehicle = await Vehicle.findById(req.params.id);
    try {
        if (!foundVehicle) throw new Error("Data may be deleted or invalid id.");
        res.status(200).send({
            status: 200,
            message: "Successfully retreived.",
            data: foundVehicle
        })
    }
    catch (e) {
        res.status(400).send({
            status: 400,
            message: e.message,
            data: null
        });
    }
}
/**
 * creates a vehicle from the database
 * @param req.body in JSON form
 * @returns newly created vehicle id with owner-Id.
**/
export const createVehicle = async (req, res, next) => {
    if (res.user.user_type !== "vendor")
        return res.status(403).send({
            status: 403,
            message: "Access Forbidden",
            data: null
        })

    try {
        const newVehicle = await Vehicle({
            "ownerId": res.user._id,
            "name": req.body.name,
            "type": req.body.type,
            "capacity": req.body.capacity,
            "platenumber": req.body.platenumber,
            "color": req.body.color,
            "modelyear": req.body.modelyear,
            "condition": req.body.condition,
            "attachments": req.body.attachments
        });
        const savedVehicle = await newVehicle.save();

        if (savedVehicle) {
            const updateUser = await user.updateOne(
                { _id: res.user._id },
                { $push: { listings: savedVehicle._id } },
            );
            res.status(200).send({
                status: 200,
                message: "Vehicle added successfully.",
                data: {
                    "_id": savedVehicle._id,
                    "ownerId": res.user._id
                }
            })
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: err.message });
    }
}

/**
 * deletes a specific vehicle from the database
 * @param req.params.id
 * @param res.user passed from the middleware
 * @returns Finds and deletes from the database.
 * Upon encountering error throws respective messages.
 * After successful deletion removes the vehicle list from the user collection.
**/
export const delVehicle = async (req, res, next) => {
    if (res.user.user_type != "vendor")
        return res.status(403).send({
            status: 403,
            message: "You dont have access to this.",
            data: null
        })

    try {
        const deletedVehicle = await Vehicle.findOneAndDelete({
            "ownerId": res.user._id,
            "_id": req.params.id
        });
        if (!deletedVehicle) throw new Error("Vehicle data must be deleted or Invalid Credentials.");

        const updateUser = await user.updateOne(
            { _id: res.user._id },
            { $pull: { listings: new ObjectId(req.params.id) } }
        );
        res.status(200).send({
            status: 200,
            message: "Successfully removed.",
            data: deletedVehicle
        })
    }
    catch (e) {
        res.status(400).send({
            status: 400,
            message: e.message,
            data: null
        });
    }
}
// export const updateVehicle = async (req, res, next) => {
//     if (res.user.user_type != "vendor")
//         return res.status(401).send({
//             status: 403,
//             message: "You dont have access to this.",
//             data: null
//         })
//     try {
//         const updatedVehicle = await Vehicle.findOneAndUpdate(
//             {
//                 "_id": req.params.id,
//                 "ownerId": res.user._id,
//             },
//             req.body
//         )
//         if (updateVehicle) {
//             res.status(200).send({ status: 200, message: "Updated Successfully", data: updatedVehicle })
//         }
//     }
//     catch (e) {
//         res.status(400).send({ status: 500, message: e, data: null })
//     }
// }