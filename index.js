const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express()
const port = 5555;

const secret = 'veryveryverysecretamikawkebolbona';

// middleware
app.use(express.json());




const uri = "mongodb+srv://TechBarik:TechBarik@cluster0.waijmz7.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    // connect collection
    const serviceCollection = client.db('cs').collection('services');
    const bookingCollection = client.db('cs').collection('booking');
    app.get('/api/v1/services', async(req, res) => {
        const result = await serviceCollection.find().toArray();
        res.send(result);
    })

    app.post('/api/v1/user/create-booking', async(req, res) => {
        const booking = req.body;
        const result = await bookingCollection.insertOne(booking);
        res.send(result)
    })

    app.delete('/api/v1/user/cancel-booking/:bookingId', async(req, res) => {
        const id = req.params.bookingId;
        const result = await bookingCollection.deleteOne({_id: new ObjectId(id)});
        res.send(result);
    })

    app.post('/api/v1/auth/access-token', async(req, res) => {
        // creating token and send to client
        const user = req.body || { email: 'mdabarik@gmail.com' };
        const token = jwt.sign(user, secret);
        res.send(token);
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {}
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send("hello world");
})


app.listen(port, () => {
    console.log("server is running");
})