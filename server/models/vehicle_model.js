import mongoose from "mongoose";


const vehicleSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Owner Id is required"],
        },
        name: {
            type: String,
            required: [true, "Vehicle name is required"]
        },
        type: {
            type: String,
            required: [true, "Vehicle type is required"],
        },
        capacity: {
            type: Number,
            min: 1,
            required: [true, "Vehicle seat count is required"],
        },
        platenumber: {
            type: String,
            required: [true, "Vehicle Number is required"]
        },
        color: {
            type: String,
            required: [true, "Vehicle color is required"]
        },
        modelyear: {
            type: Date,
            required: [true, "Model year is required"],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (date) {
                    return date <= Date.now();
                },
                message: "Model date should be less than current date",
            },
        },
        condition: {
            type: String,
            required: [true, "Condition is required"]
        },
        attachments: {
            type: Array,
            required: [true, "Attachments is required"]
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: { type: Date }
    }
);
export const Vehicle = mongoose.model('vehicle', vehicleSchema);