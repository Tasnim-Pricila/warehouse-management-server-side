const jwt = require('jsonwebtoken');

module.exports.generateToken = (email) => {
    const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });

    return accessToken;
} 
