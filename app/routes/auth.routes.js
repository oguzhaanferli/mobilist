const { check } = require('express-validator');
const { validateRequest } = require('../../middleware/validate-request');

module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();

    router.post("/gettoken", [
        check('username', 'username is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        validateRequest
    ], auth.login);

    app.use('/api', router);
};