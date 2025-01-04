const errors = require('../constant/errors');   

const notFound = (req, res, next) => {
    const error = new Error(errors.notFound.code);
    next(error);
};

module.exports = notFound;