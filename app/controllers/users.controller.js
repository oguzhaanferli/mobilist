const db = require("../../models");
const User = db.User;
const Op = db.Sequelize.Op;
const { returnSuccess, returnError } = require('../../app/models/baseReturnModel')
const statusCode = require('../../app/models/statusCode')

exports.create = (req, res) => {
    User.create(req.body)
        .then(data => { res.status(statusCode.Created).send(); })
        .catch(err => {
            res.status(statusCode.InternalServerError).send(returnError([err.message || "Some error occurred while creating the User."]));
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(statusCode.NoContent).send();
            } else {
                res.status(statusCode.NotFound).send(returnError([`Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`]));
            }
        })
        .catch(err => {
            res.status(statusCode.InternalServerError).send(returnError(["Error updating User with id=" + id]));
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(statusCode.NoContent).send();
            } else {
                res.status(statusCode.NotFound).send(returnError([`Cannot delete User with id=${id}. Maybe User was not found!`]));
            }
        }).catch(err => {
            res.status(statusCode.InternalServerError).send(returnError(["Could not delete User with id=" + id]));
        });
};

exports.findAll = (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const company = req.query.company;
    const phoneNumber = req.query.phoneNumber;

    var condition = {};
    if (firstName) condition["firstName"] = { [Op.like]: `%${firstName}%` };
    if (lastName) condition["lastName"] = { [Op.like]: `%${lastName}%` };
    if (company) condition["company"] = { [Op.like]: `%${company}%` };
    if (phoneNumber) condition["phoneNumber"] = { [Op.like]: '%' + phoneNumber + '%' };

    console.log(condition);
    User.findAll({ where: condition })
        .then(data => {
            res.status(statusCode.Ok).send(returnSuccess(data));
        })
        .catch(err => {
            res.status(statusCode.InternalServerError).send(returnError([err.message || "Some error occurred while retrieving tutorials."]));
        });
};
