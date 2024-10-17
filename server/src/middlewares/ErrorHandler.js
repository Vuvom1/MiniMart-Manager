const errors = require('../constant/errors')

function ErrorHandler(error, req, res, next) {
    try {
        const objError = errors[error];
        res.statusCode = objError.statusCode;
        res.send(objError);
    } catch {
        res.statusCode = 500;
        res.send({ error: true, message: error.message });
    }

}

module.exports = ErrorHandler;