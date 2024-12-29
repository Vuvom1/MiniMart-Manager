const User = require('../models/User')
const jwt = require('jsonwebtoken');
const createToken = require('../util/JwtUtil')
const errors = require('../constant/errors')
const UserStatus = require('../constant/UserStatus');
const UserRole = require('../constant/UserRole');
const CustomerController = require('./CustomerController');
const asyncErrorHandler = require('../util/asyncErrorHandler');


class AuthController {

    signup_post = asyncErrorHandler(async (req, res, next) => {

        const { firstname, lastname, username, email, password, role, image, dateOfBirth, phone, address, status } = req.body;


        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail) {
            const error = new Error(errors.alreadyExistEmail.code);
            next(error);
        }

        if (existingUsername) {
            const error = new Error(errors.alreadyExistUsername.code);
            next(error);
        }

        const user = await User.create({ firstname, lastname, username, email, password, role, image, dateOfBirth, phone, address, status });

        if ((role === UserRole.Customer)) {
            await CustomerController.createCustomer(user);
        }

        const token = createToken(user)
        res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 })
        return res.status(201).json(user);
    });


    login_post = asyncErrorHandler(async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.login(email, password)

        if (!user) {
            const error = new Error(errors.incorrectEmailOrPassword.code);
            return next(error);
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict',
        });

        return res.status(200).json(user)
    })

    updatePassword_put = asyncErrorHandler(async (req, res, next) => {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            const error = new Error(errors.missingRequiredFields.code);
            return next(error);
        }

        const updatedUser = await User.updatePassword(id, currentPassword, newPassword);
        if (!updatedUser) {
            const error = new Error(errors.incorrectPassword.code);
            return next(error);
        }

        return res.status(200).json('Password updated successfully');
    });

    logout_get = (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }

}

module.exports = new AuthController;   