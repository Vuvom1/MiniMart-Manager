const notFound = require("../middlewares/NotFound");

const errors = {
    unauthorized: {
        statusCode: 401,
        message: "Unauthorized",
        code: "unauthorized",
    },
    invalidToken: {
        statusCode: 401,
        message: "Invalid token",
        code: "invalidToken",
    },
    forbidden: {
        statusCode: 403,
        message: "Forbidden",
        code: "forbidden",
    },

    internalServerError: {
        statusCode: 500,
        message: "Internal server error",
        code: "internalServerError",
    },
    invalidCredentials: {
        statusCode: 400,
        message: "Invalid credentials",
        code: "invalidCredentials",
    },
    incorrectEmailOrPassword: {
        statusCode: 400,
        message: "Incorrect email or password",
        code: "incorrectEmailOrPassword",
    },
    incorrectPassword: {
        statusCode: 400,
        message: "Incorrect password",
        code: "incorrectPassword",
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
    alreadyExistSchedule: {
        statusCode: 400,
        message: "Schedule already exist",
        code: "alreadyExistSchedule",
    },
    
    alreadyExistPromotionCode: {
        statusCode: 400,
        message: "Promotion code already exists. Please use a different code.",
        code: "alreadyExistPromotionCode",
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
    
    requiredFieldMissing: {
        statusCode: 400,
        message: "Required fields missing",
        code: "requiredFieldMissing",
    },

    userNotFound: {   
        statusCode: 400,
        message: "User not found",
        code: "userNotFound",
    },
    productNotFound: {
        statusCode: 400,
        message: "Product not found",
        code: "productNotFound",
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
    customerNotFound: {
        statusCode: 400,
        message: "Customer not found",
        code: "customerNotFound",
    },

    noAppllicableProduct: {
        statusCode: 400,
        message: "No applicable product",
        code: "noAppllicableProduct",
    },
    noGiftItems: {
        statusCode: 400,
        message: "No gift items",
        code: "noGiftItems",
    },
    promotionTime: {
        statusCode: 400,
        message: "Start time must be before end time",
        code: "promotionTime",
    },
    highDiscountPercentage: {   
        statusCode: 400,
        message: "Discount percentage must be less than 100",
        code: "highDiscountPercentage",
    },
    lowDiscountPercentage: {
        statusCode: 400,
        message: "Discount percentage must be greater than 0",
        code: "lowDiscountPercentage",
    },  
    lowMaxUsage:{
        statusCode: 400,
        message: "Max usage must be greater than 0",
        code: "lowMaxUsage",
    },
    lowMaxDiscountAmount: {
        statusCode: 400,
        message: "Max discount amount must be greater than 0",
        code: "lowMaxDiscountAmount",
    },
    lowRequiredQuantity: {
        statusCode: 400,
        message: "Required quantity must be greater than 0",
        code: "lowRequiredQuantity",
    },
    lowRewardQuantity: {
        statusCode: 400,
        message: "Reward quantity must be greater than 0",
        code: "lowRewardQuantity",
    },
    invalidPromotionStatus: {
        statusCode: 400,
        message: "Invalid promotion status",
        code: "invalidPromotionStatus",
    },
    notFound: {
        statusCode: 404,
        message: "Not found",
        code: "notFound",
    }
}

module.exports = errors;