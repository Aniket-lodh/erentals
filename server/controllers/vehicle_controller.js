import { Vehicle } from "../models/vehicle_model.js";

export const getAllVehicles = async (req, res, next) => {
    const vehicles = await Vehicle.find();
    res.status(200).send(vehicles);
}

export const createVehicle = async (req, res, next) => {
    const newVehicle = await Vehicle(req.body);
    try {
        const savedVehicle = await newVehicle.save();
        res.status(200).send({
            status: 200,
            message: "Vehicle added successfully.",
            data: savedVehicle
        })
    }
    catch (err) {
        res.status(400).send(err);
    }
}

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


export const delVehicle = async (req, res, next) => {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    try {
        if (!deletedVehicle) throw new Error("Invalid Credentials.");
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