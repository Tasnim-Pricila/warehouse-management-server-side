const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send("Cars are coming");
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hcyv7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect();
        const carCollection = client.db('warehouseManagement').collection('cars');

        app.get('/cars', async (req,res)=>{
            const query = {};
            const cursor = carCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/cars/:id', async (req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await carCollection.findOne(query);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log("Listening to port", port);
})