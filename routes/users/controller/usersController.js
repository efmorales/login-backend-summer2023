
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { createUser, hashPassword, comparePassword } = require("./userHelper");


module.exports = {
    login: async (req, res) => {
        try {
            console.log(req.body);

            // check if user exists / get the user from DB

            let foundUser = await User.findOne({username:req.body.username})

            if (!foundUser) {
                throw {
                    status: 404,
                    message: "User Not Found"
                }
            }

            // check if password matches

            let checkedPassword = await comparePassword(req.body.password, foundUser.password);

            if (!checkedPassword) {
                throw {
                    status: 403,
                    message: "Invalid password"
                }
            }

            let payload = {
                id: foundUser._id,
                username: foundUser.username
            }

            let token = await jwt.sign(payload, process.env.JWT_KEY,{expiresIn: 5*60})

            res.status(200).json({
                username: req.body.username,
                password: req.body.password,
                message: "Successful Login!!",
                token: token
            })
        } catch (error) {
            res.status(error.status).json(error.message);
        }
    },

    register: async (req, res) => {
        try {
            console.log(req.body);

            let foundUser = await User.findOne({username:req.body.username});

            if (foundUser) {
                throw {
                    status: 409,
                    message: "user exist already"
                }
            }

            let newUser = await createUser(req.body);

            let hashedPassword = await hashPassword(req.body.password)

            newUser.password = hashedPassword

            //hash password
            let savedUser = await newUser.save();

            res.status(200).json({
                userObj: savedUser,
                message: `succesfully registered ${savedUser.username}`,
            })
        }
        catch (e) {
            res.status(e.status).json('error');
        }
    }

    // add controller function object
}


// const login = (req, res) => {
//     return {
//         username: req.body.username
//     }
// }
//
// module.exports = {
//     login
// }