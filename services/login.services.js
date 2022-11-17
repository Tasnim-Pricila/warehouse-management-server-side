const { generateToken } = require('../utils/generateToken');

exports.loginServices = (data) => {
    const accessToken = generateToken(data)
    return accessToken;
}