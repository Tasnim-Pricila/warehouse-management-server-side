const loginController = require('../controllers/login.controller');
const express = require('express');
const loginRoute = express.Router();

loginRoute.route('/')
    .post(loginController.loginController)

module.exports = loginRoute;