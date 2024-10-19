const User = require('../models/User')
const jwt = require('jsonwebtoken'); 
const createToken = require('../util/JwtUtil')
const errors = require('../constant/errors')


class AuthController {

    signup_get = (req, res) => {
        res.send('sign up')
    }

    login_get = (req, res) => {
        res.render('login')
    }

    signup_post = async (req, res, next) => {
        try {
            const {firstname, lastname, username, email, password, role, image, dateOfBirth, phone, address} = req.body;

            const existingEmail = await User.findOne({ email });
            const existingUsername = await User.findOne({ username });

            if (existingEmail) {
                const error = new Error(errors.alreadyExistEmail.message);
                error.code = 'alreadyExistEmail';
                throw error;
            }

            if (existingUsername) {
                const error = new Error(errors.alreadyExistUsername.message);
                error.code = 'alreadyExistUsername';
                throw error;
            }

            const user = await User.create({firstname, lastname, username, email, password, role, image, dateOfBirth, phone, address});
            const token = createToken(user)
            res.cookie('jwt', token, {httpOnly: true, secure: false, maxAge: 3600000})
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }


    login_post = async (req, res, next) => {
        const {email, password} = req.body;
        
        try {
            const user = await User.login(email, password)
            const token = createToken(user)
            res.cookie('jwt', token, {httpOnly: true, maxAge: 3600000})
            res.status(200).json(user) 
        } catch(error) {
            next(error);
        } 
    }

    logout_get = (req, res) => {
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/');
    }

}

module.exports = new AuthController;   