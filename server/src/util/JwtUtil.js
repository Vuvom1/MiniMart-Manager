const jwt = require('jsonwebtoken');

function createToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
};

module.exports = createToken;