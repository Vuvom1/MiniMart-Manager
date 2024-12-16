const errors = {
    internalServerError: {
        statusCode: 500,
        message: "Internal server error",
        code: "internalServerError",
    },
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
    alreadyExistPhone: {
        statusCode: 400,
        message: "Phone number already exists. Please use a different phone number.",
        code: "alreadyExistPhone",
    },
    incorrectEmailOrPassword: {
        statusCode: 400,
        message: "Incorrect email or password.",
        code: "incorrectEmailOrPassword",
    },
    doesNotExistSchedule: {
        statusCode: 400,
        message: "Schedule does not exist",
        code: "doesNotExistSchedule",
    },
    alreadyExistSchedule: {
        statusCode: 400,
        message: "Schedule already exist",
        code: "alreadyExistSchedule",
    },
    requiredFieldMissing: {
        statusCode: 400,
        message: "Required fields missing",
        code: "requiredFieldMissing",
    },

    promotionNotFound: {
        statusCode: 400,
        message: "Promotion not found",
        code: "promotionNotFound",
    },
    employeeNotFound: {
        statusCode: 400,
        message: "Employee not found",
        code: "employeeNotFound",
    },
    supplierNotFound: {
        statusCode: 400,
        message: "Supplier not found",
        code: "supplierNotFound",
    },
    userNotFound: {    
        statusCode: 400,
        message: "User not found",
        code: "userNotFound",
    },
    positionNotFound: {
        statusCode: 400,
        message: "Position not found",
        code: "positionNotFound",
    },
    scheduleNotFound: {
        statusCode: 400,
        message: "Schedule not found",
        code: "scheduleNotFound",
    },
    shiftNotFound: {
        statusCode: 400,
        message: "Shift not found",
        code: "shiftNotFound",
    },
}

module.exports = errors;