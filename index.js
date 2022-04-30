const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send("Cars are coming");
})

app.listen(port, ()=>{
    console.log("Listening to port", port);
})