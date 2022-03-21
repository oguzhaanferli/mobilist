const errorCodes = require('./returnModelCode');

const returnSuccess = (data) => {
    return {
        code: errorCodes.success,
        errors: [],
        data: data
    };
}
const returnError = (errors) => {
    return {
        code: errorCodes.error,
        errors: errors,
        data: null
    };
}

module.exports = {
    returnSuccess,
    returnError,
};
