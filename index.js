const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { connectToServer } = require('./utils/dbConnection');
const carRoute = require('./routes/cars.route');
const loginRoute = require('./routes/login.route');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    }
    else {
        console.log(err);
    }
});


app.get("/", (req, res) => {
    res.send('Cars are coming')
});

app.use('/cars', carRoute)
app.use('/login', loginRoute)

