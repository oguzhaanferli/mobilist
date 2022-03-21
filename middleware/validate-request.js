const { validationResult } = require('express-validator');
const { returnError } = require('../app/models/baseReturnModel')
const statusCode = require('../app/models/statusCode')

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        let errorlist = [];
        errors.errors.map(element => { errorlist.push(element.msg); });
        return res.status(statusCode.BadRequest).json(returnError(errorlist));
    }
    next();
}

module.exports = {
    validateRequest
}