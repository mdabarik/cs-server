const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express()
const port = 5555;

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
        console.log(req.body);
        res.send('hello')
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