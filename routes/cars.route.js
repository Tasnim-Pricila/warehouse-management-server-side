const express = require('express');
const carController = require('../controllers/cars.controller');
const verifyJWT = require('../middlewares/verifyToken');
const carRoute = express.Router();

carRoute.route('/')
    .get(carController.getCars)
    .post(carController.createCarById)

carRoute.route('/totalCar')
    .get(carController.getTotalCar)

carRoute.route('/user/:email')
    .get(verifyJWT, carController.getCarsByEmail)

carRoute.route('/:id')
    .get(carController.getCarsById)
    .patch(carController.updateCarById)
    .delete(carController.deleteCarById)

module.exports = carRoute;
