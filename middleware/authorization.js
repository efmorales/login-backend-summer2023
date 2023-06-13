const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    console.log("Middleware!!!!")
    try {
        const bearerToken = req.headers.authorization
        if (bearerToken) {



            next()  
        } else {
            throw {
                status: 401,
                message: 'Missing Token'
            }
        }
    } catch (error) {
       res.status(error.status).json(error.message) 
    }
}

module.exports = { verifyToken }