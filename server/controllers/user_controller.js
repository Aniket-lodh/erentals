import { user as UserModule } from "../models/user_model.js";
import getErrors from "../utils/elog.js";
import { createAccessToken } from "./authController.js";

/**
 * Get all available users from the database
 * @returns available users if exists in the database else err message.
**/
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModule.find();
        if (!users) return res.status(400).send({ status: 400, message: "No users record found.", data: null })
        res.status(200).send({ status: 200, message: "Successfully retreived records.", data: users });
    } catch (error) {
        res.status(500).send({ status: 500, message: error, data: null });
    }
}

/**
 * Get user profile from the database
 * @param res.user passed from middleware
 * @returns exisiting user if exists in the database else err message.
**/
export const getProfile = async (req, res) => {
    try {
        res.status(200).send({ status: 200, message: "Profile found successfully", data: res.user })
    }
    catch (err) {
        res.status(500).send({ status: 500, message: err.message, data: null })
    }
}

/**
 * creates an user
 * @param req.body
 * @returns an Access token of the user.
**/
export const createUser = async (req, res, next) => {
    try {
        const user = new UserModule(req.body);
        user.save(async function (error, _document) {
            const resp = getErrors(error); //check for errors
            //Send Errors to browser
            (resp.status === 200 ? resp.accessToken = await createAccessToken(_document) : '');
            res.status(resp.status).json(resp);
        });
    } catch (e) {
        res.status(500).send({ status: 500, message: e.message, data: null })
    }
}


export const updateUser = async (req, res) => {

    (req.body.username ? res.user.username = req.body.username : '');
    (req.body.gender ? res.user.gender = req.body.gender : '');
    (req.body.email ? res.user.email = req.body.email : '');
    (req.body.phone ? res.user.phone = req.body.phone : '');
    (req.body.passcode ? res.user.passcode = req.body.passcode : '');
    (req.body.address ? res.user.address = req.body.address : '');

    try {
        await res.user.save(
            function (error, _document) {
                //check for errors
                let resp = getErrors(error);
                //Send Errors to browser
                (resp.status === 200 ? resp._id = _document._id : '');
                (resp.status === 200 ? resp.message = "No Errors found, Updated successfully" : resp.message);
                res.status(resp.status).send(resp);
            }
        )
    } catch (err) {
        res.status(500).send({ message: "Internal server error. Please contact Support team!" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await res.user.remove()
        res.send({ message: "Successfully removed" })
    } catch (err) {
        res.send({ message: err.message })
    }
}
// GET THE DEDICATED USER
export const findUser = async (req, res, next) => {
    let user;
    try {
        user = await UserModule.findById(req.params.id)
        if (user == null) {
            return res.status(404).send({ message: 'User doesn\'t exist' })
        }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
    res.user = user
    next()
}
// TODO:Implement user login method

export const loginUser = async (req, res, next) => {
    try {
        const { email, passcode } = req.body;

        // 1) Check if email and password exist
        if (!email || !passcode)
            return res.status(400).send({ status: 400, message: 'Please provide email and password!', data: null });

        // 2) Check if user exists && password is correct
        const user = await UserModule.findOne({ email }).select('+passcode');
        
        if (!user || !(await user.correctPassword(passcode, user.passcode))) //TODO: work on the userSchema method
            return res.status(401).send({ status: 401, message: "Email or Password is invalid.", data: null })

        res.status(200).send({
            status: 200,
            message: "Logged in Successfully",
            data: await createAccessToken(user)
        });
    }
    catch (err) {
        res.status(403).send({ status: 403, message: err.message, data: null })
    }
}