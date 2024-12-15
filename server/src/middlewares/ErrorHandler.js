const errors = require('../constant/errors')

function ErrorHandler(error, req, res, next) {
    try { 
        const objError = errors[error.message];
        res.status(objError.statusCode).send(objError);
    } catch {
        const objError = errors[errors.internalServerError];
        res.status(500).send(objError);
    }

}

module.exports = ErrorHandler;