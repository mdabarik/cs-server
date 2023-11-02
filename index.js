const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express()
const port = 5555;





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
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // execute always
  }
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send("hello world");
})



app.get('/api/v1/services', (req, res) => {
    res.send('it is working');
})


app.listen(port, () => {
    console.log("server is running");
})