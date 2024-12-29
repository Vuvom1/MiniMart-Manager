const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const errors = require('../constant/errors');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter lastname']
    },
    username: {
        type: String,
        required: [true, 'Please enter username']
    },
     email: {
        type: String,
        require: [true, 'Please enter email'],
        uniqued: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email'],
     },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [6, 'Password must be 6 character longer'] 
    }, 
    role: {
        type: String,
        required: [ true, 'Please enter user role'],
    },
    image: {
        type: String, 
        required: false,       
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Please enter date of birth']
    },
    phone: {
        type: Number,
        required: [true, 'Please enter phone number']
    },
    address: {
        type: String,
        required: [true, 'Please enter address']
    },
    status: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function (next)
 {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next(); 
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        } 
        throw Error(errors.incorrectEmailOrPassword.code);
    } 
    throw Error(errors.incorrectEmailOrPassword.code);
}

userSchema.statics.updatePassword = async function(id, currentPassword, newPassword) {
    const user = await this.findById(id);
    if (!user) {
        throw Error(errors.userNotFound.code);
    } 
    const auth = await bcrypt.compare(currentPassword, user.password);
    if (auth) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(id, user);
        return user;
    }
    throw Error(errors.incorrectPassword.code);
}

const User = mongoose.model('User', userSchema);

module.exports = User; 