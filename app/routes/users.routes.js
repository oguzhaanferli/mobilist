const { check } = require('express-validator');
const { validateRequest } = require('../../middleware/validate-request');
const { verifytoken } = require('../../middleware/verify-token');

module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();

    router.post("/", [
        check('firstName', 'firstName is required').not().isEmpty(),
        check('lastName', 'lastName is required').not().isEmpty(),
        check('company', 'company is required').not().isEmpty(),
        check('phoneNumber', 'phoneNumber is required').not().isEmpty(),
        validateRequest
    ], users.create);

    router.put("/:id", [
        check('firstName', 'firstName is required').not().isEmpty(),
        check('lastName', 'lastName is required').not().isEmpty(),
        check('company', 'company is required').not().isEmpty(),
        check('phoneNumber', 'phoneNumber is required').not().isEmpty(),
        validateRequest
    ], users.update);

    router.delete("/:id", users.delete);
    router.get("/", users.findAll)

    app.use('/api/users', [verifytoken], router);
};