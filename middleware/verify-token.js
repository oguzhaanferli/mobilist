const jwt = require("jsonwebtoken");
const { returnError } = require('../app/models/baseReturnModel')
const statusCode = require('../app/models/statusCode');

const verifytoken = (request, response, next) => {
    const token = (request.headers["authorization"] || request.body.token || request.query.token).replace("Basic ", "");
    if (!token) {
        response.status(statusCode.NotFound).send(returnError(["token not found"]));
    }
    else {
        jwt.verify(token, request.app.get("api_secret_key"), (error, decoded) => {
            if (error) {
                response.status(statusCode.Unauthorized).send(returnError(["invalid token"]));
            }
            else {
                request.decode = decoded;
                next();
            }
        });
    }
};

module.exports = {
    verifytoken
}