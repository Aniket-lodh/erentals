import jwt from "jsonwebtoken";
import { user as UserModule } from "../models/user_model.js";

export const createAccessToken = async function (user) {
    const id = { "_id": user._id };
    const accessToken = jwt.sign(id, process.env.TOKEN_SECRET);
    return accessToken
}
//TODO: need to improve

export const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];
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
        const user = jwt.verify(res.token, process.env.TOKEN_SECRET);
        const userObj = await UserModule.findById(user);
        if (!userObj) {
            return res.status(404).send({ message: 'User doesn\'t exist' })
        }
        res.user = userObj;
        next()
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}
//TODO:work on the authenticate part of creating a vehicle of particular user
