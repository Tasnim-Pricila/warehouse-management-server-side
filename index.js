const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// function verifyJWT(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).send({ message: "Unauthorized Access" });
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).send({ message: "Forbidden Access" });

//         }
//         console.log(decoded);
//         req.decoded = decoded;
//    nodemonnext();
//     })
//     // console.log('Inside verifyJWT', authHeader);
//    
// }


app.get('/', (req, res) => {
    res.send("Cars are coming");
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hcyv7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const carCollection = client.db('warehouseManagement').collection('cars');

        app.post('/login', async (req, res) => {
            const email = req.body;
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '1d'
                });
            res.send({ accessToken });
        })

        // GET 
        app.get('/cars', async (req, res) => {
            // Get by email 
            if (req.query.email) {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    return res.status(401).send({ message: "Unauthorized Access" });
                }
                const token = authHeader.split(' ')[1];
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(403).send({ message: "Forbidden Access" });
                    }
                    req.decoded = decoded;
                })
                const email = req.query.email;
                const decodedEmail = req.decoded.email;
                if (email === decodedEmail) {
                    const query = { email: email };
                    const cursor = carCollection.find(query);
                    const result = await cursor.toArray();
                    res.send(result);
                }
                else {
                    res.status(403).send({ message: "Forbidden Access" });
                }
            }
            else {
                console.log('query', req.query)
                const activePage = parseInt(req.query.activePage);
                const limit = parseInt(req.query.limit);
                const query = {};
                const cursor = carCollection.find(query);
                let result;
                if (activePage || limit) {
                    result = await cursor.skip(activePage * limit).limit(limit).toArray();
                }
                else {
                    result = await cursor.toArray();
                }
                res.send(result);
            }
        })

        // Total CAr 
        app.get('/totalCar', async (req, res) => {
            const result = await carCollection.estimatedDocumentCount();
            res.send({ result });
        })

        // GET by ID 
        app.get('/cars/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await carCollection.findOne(query);
            res.send(result);
        })

        // UPDATE 
        app.put('/cars/:id', async (req, res) => {
            const id = req.params.id;
            const updated = req.body;
            const query = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updated.quantity
                }
            };
            const result = await carCollection.updateOne(query, updatedDoc, options);
            res.send(result);
        })

        // Delete 
        app.delete('/cars/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await carCollection.deleteOne(query);
            res.send(result);
        })

        // POST 
        app.post('/cars', async (req, res) => {
            const newCars = req.body;
            const result = await carCollection.insertOne(newCars);
            res.send(result);
        })
    }

    finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log("Listening to port", port);
})