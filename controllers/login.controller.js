const { loginServices } = require("../services/login.services")

exports.loginController = async (req, res, next) => {
    try {
        const result = await loginServices(req.body);
        
        res.status(200).send({
            status: 'success',
            message: 'Successfully logged in',
            accessToken: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: error.message
        })
    }

}