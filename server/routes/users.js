import express from "express";
import { user as UserModule } from "../models/user_model.js";
import getErrors from "../elog.js";
import { Error } from "mongoose";

const router = express.Router();

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await UserModule.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}
)

// Getting one
router.get('/findone/:_id', getUser, async (req, res) => {
    // url format : users/632c797f9764b42d31a531c3?email=abc@gmail.com
    // Params get the id and query get all attributes after ?
    res.send(res.user)
})

//Loggin in
router.get('/login', async (req, res) => {
    const user = await UserModule.findOne(req.query)
    try {
        if (Object.keys(req.query).length==0) {
            throw new Error("Couldn't find any matching records.");
        }
        res.send(user);
    }
    catch (err) {
        res.status(400).send({ message: err.message })
    }
})

// Creating one || Sign up
router.post('/signup', async (req, res) => {
    try {
        const user = new UserModule(req.body);
        await user.save(function (error, _document) {
            //check for errors
            let resp = getErrors(error);
            //Send Errors to browser
            (resp.status === 200 ? resp._id = _document._id : '')
            res.status(resp.status).json(resp);
        });
    } catch (e) {
        res.status(500).send({ message: "Internal server error. Please contact Support team!" })
    }
})




// Updating one
/** Patch is being used instead of put too
 only to update the specific parts the users give
 **/
router.patch('/update/:_id', getUser, async (req, res) => {

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
})
// Deleting one
router.delete('/delete/:_id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.send({ message: "Successfully removed" })
    } catch (err) {
        res.send({ message: err.message })
    }
})

// Get the dedicated user
async function getUser(req, res, next) {
    let user;
    try {
        user = await UserModule.findById(req.params._id)
        if (user == null) {
            return res.status(404).send({ message: 'User doesn\'t exist' })
        }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
    res.user = user
    next()
}


export default router