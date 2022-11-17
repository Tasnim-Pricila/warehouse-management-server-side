const { getTotalCar, getCarServices, getCarByIdServices, updateCarByIdServices, deleteCarByIdServices, createCarServices, getCarsByEmailService } = require("../services/cars.services")

exports.createCarById = async (req, res, next) => {
    try {
        const result = await createCarServices(req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully created the car',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to create the car',
            error: error.message
        })
    }
}
exports.getCars = async (req, res, next) => {
    try {
        const result = await getCarServices(req.query);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get cars',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to get cars',
            error: error.message
        })
    }

}
exports.getCarsById = async (req, res, next) => {
    try {
        const result = await getCarByIdServices(req.params.id);
        res.status(200).send({
            status: 'success',
            message: ' Successfully get car',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to get car',
            error: error.message
        })
    }
}
exports.deleteCarById = async (req, res, next) => {
    try {
        const result = await deleteCarByIdServices(req.params.id);
        res.status(200).send({
            status: 'success',
            message: ' Successfully deleted the car',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to delete the car',
            error: error.message
        })
    }
}
exports.getTotalCar = async (req, res, next) => {
    try {
        const result = await getTotalCar();
        res.status(200).send({
            status: 'success',
            message: ' Successfully get  total car',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to get total car',
            error: error.message
        })
    }

}

exports.updateCarById = async (req, res, next) => {
    try {
        const result = await updateCarByIdServices(req.params.id, req.body);
        res.status(200).send({
            status: 'success',
            message: ' Successfully update the car',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to update car',
            error: error.message
        })
    }
}

exports.getCarsByEmail = async (req, res, next) => {
    try {
        const decodedEmail = req.user?.email;
        const result = await getCarsByEmailService(decodedEmail , req.params.email);
        // console.log(req.params, decodedEmail)
        res.status(200).send({
            status: 'success',
            message: ' Successfully get cars',
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: ' failed to get car',
            error: error.message
        })
    }
}
