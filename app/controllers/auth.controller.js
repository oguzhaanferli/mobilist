const jwt = require('jsonwebtoken');
const { returnSuccess, returnError } = require('../../app/models/baseReturnModel')
const statusCode = require('../../app/models/statusCode')

exports.login = (req, res) => {
    if (req.body.username == "oguzhan", req.body.password == "12345") {
        const token = jwt.sign(req.body, req.app.get("api_secret_key"), { expiresIn: 12000 });
        res.status(statusCode.Ok).send(returnSuccess({ status: true, token }));
    }
    else {
        res.status(statusCode.NotFound).send(returnError(["User Not Found."]));
    }
}