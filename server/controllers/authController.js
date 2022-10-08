import jwt from "jsonwebtoken";
import { promisify } from "util";
import { user as UserModule } from "../models/user_model.js";

export const createAccessToken = async function (user) {
    const id = { "_id": user._id };
    const accessToken = jwt.sign(id, process.env.TOKEN_SECRET);
    return accessToken
}
//FIXME: need to improve

export const verifyToken = async (req, res, next) => {
    const bearerToken = await req.headers['authorization'];
    if (bearerToken) {
        const token = bearerToken.split(' ')[1];
        res.token = token;
        next()
    }
    else {
        res.status(403).send({
            status: 403,
            message: "User isn't logged in or Invalid credentials.",
            data: null
        })
    }
}
export const verifyUser = async (req, res, next) => {

    try {
        const user = await promisify(jwt.verify)(res.token, process.env.TOKEN_SECRET);

        const userObj = await UserModule.findById(user);
        if (!userObj)
            return res.status(404).send({ status: 400, message: 'User doesn\'t exist' })
        res.user = userObj;
        next()
    } catch (err) {
        return res.status(500).send({ status: 500, message: err.message })
    }
}
//TODO:work on the authenticate part of creating a vehicle of particular user
