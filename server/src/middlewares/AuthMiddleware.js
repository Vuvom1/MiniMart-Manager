const jwt = require('jsonwebtoken');
const User = require('../models/User');
const errors = require('../constant/errors');
const asyncErrorHandler = require('../util/asyncErrorHandler')

const authMiddleware = (requiredRoles) => asyncErrorHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (!token) {
        const error = new Error(errors.unauthorized.code);
        return next(error);        
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
        const error = new Error(errors.userNotFound.code);
        return next(error);
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        const error = new Error(errors.forbidden.code);
        return next(error);
    }

    req.user = user;
    next();
});

module.exports = authMiddleware;