const errors = {
    resourceDoesNotExist: {
        statusCode: 400,
        message: "Resource does not exist",
        code: "resourceDoesNotExist",
    },
    resourceAlreadyExist: {
        statusCode: 400,
        message: "Resource already exists",
        code: "resourceAlreadyExist",
    },
    validationError: {
        statusCode: 400,
        message: "Validation failed",
        code: "validationError",
    },
    alreadyExistEmail: {
        statusCode: 400,
        message: "Email already exists. Please use a different email.",
        code: "alreadyExistEmail",
    },
    alreadyExistUsername: {
        statusCode: 400,
        message: "Username already exists. Please choose a different username.",
        code: "alreadyExistUsername",
    },
    alreadyExistName: {
        statusCode: 400,
        message: "Name already exists. Please use a different name.",
        code: "alreadyExistName",
    },
    incorrectEmailOrPassword: {
        statusCode: 400,
        message: "Incorrect email or password.",
        code: "incorrectEmailOrPassword",
    },
}

module.exports = errors;