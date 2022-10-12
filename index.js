const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5cavpm1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const placeCollection = client.db('travel_agency').collection('place');

        app.get('/place', async (req, res) => {
            const query = {};
            const cursor = placeCollection.find(query);
            const places = await cursor.toArray();
            res.send(places);
        });

        app.get('/place/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const place = await placeCollection.findOne(query);
            res.send(place);
        });
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Running Travel_Agency");
});

app.listen(port, () => {
    console.log("Listening to port", port);
});