import jwt from "jsonwebtoken";
export const createAccessToken =async function (user) {
    const id={"_id":user._id};
    const accessToken = jwt.sign(id, process.env.TOKEN_SECRET);
    return accessToken
}

//TODO: need to improve