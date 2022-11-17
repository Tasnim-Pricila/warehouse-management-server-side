const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnection");

exports.createCarServices = async (data) => {
    const db = getDb();
    const result = await db.collection('cars').insertOne(data);
    return result;
}
exports.getCarServices = async (value) => {
    const db = getDb();
    const { activePage, limit } = value;
    // console.log(activePage, limit);
    const intLimit = parseInt(limit);
    const intPage = parseInt(activePage);
    let result;
    if (intPage || intLimit ) {
        result = await db.collection('cars').find()
                                            .skip(intPage * intLimit)
                                            .limit(intLimit)
                                            .toArray();
    }
    else {
        result = await db.collection('cars').find({}).toArray();
    }
    return result;
}
exports.getCarByIdServices = async (id) => {
    const db = getDb();
    const result = await db.collection('cars').findOne({ _id: ObjectId(id) });
    return result;
}
exports.deleteCarByIdServices = async (id) => {
    const db = getDb();
    const result = await db.collection('cars').deleteOne({ _id: ObjectId(id) });
    return result;
}
exports.getTotalCar = async () => {
    const db = getDb();
    const result = await db.collection('cars').estimatedDocumentCount();
    return result;
}
exports.updateCarByIdServices = async (id, data) => {
    const db = getDb();
    const result = await db.collection('cars').updateOne(
        { _id: ObjectId(id) },
        {
            $set: {
                quantity: data.quantity
            }
        },
        { upsert: true }
    );
    return result;
}

exports.getCarsByEmailService = async (decodedEmail, email) => {
    const db = getDb();
    let result;
    if (decodedEmail === email){
        result = await db.collection('cars').find({ email: email}).toArray();
    }
    return result;
}