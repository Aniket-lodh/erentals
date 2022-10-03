import { user as UserModule } from "../models/user_model.js";
import getErrors from "../utils/elog.js";
import { createAccessToken } from "./authController.js";


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModule.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}
// url format : users/632c797f9764b42d31a531c3?email=abc@gmail.com
// Params get the id and query get all attributes after ?
export const getUser = async (req, res) => {
    res.send(res.user)
}
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
        res.status(500).send({ message: e.message })
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