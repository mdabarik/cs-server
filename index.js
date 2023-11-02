const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express()
const port = 5555;

const secret = 'veryveryverysecretamikawkebolbona';

// middleware
app.use(express.json());
app.use(cookieParser());
app.use({
    origin: 'http://localhost:5173',
    credentials: true
})


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

    // middleware
    // verify token
    const geteman = (req, res, next) => {
        const {token} = req.cookies;
        // if client does not send token
        if (!token) {
            return res.status(401).send({message: "you are not authoried"});
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({message: 'Unauthorized'}) ;
            }
            req.user = decoded;
            next();
        })
    }
    
    // connect collection
    const serviceCollection = client.db('cs').collection('services');
    const bookingCollection = client.db('cs').collection('booking');
    app.get('/api/v1/services', async(req, res) => {
        const result = await serviceCollection.find().toArray();
        res.send(result);
    })

    app.post('/api/v1/user/create-booking', geteman, async(req, res) => {
        const booking = req.body;
        const result = await bookingCollection.insertOne(booking);
        res.send(result)
    })

    app.get('/api/v1/user/booking', geteman, async(req, res) => {
        const booking = req.body;
        const {email} = req.query;
        if (req.user?.email != email) {
            res.status(403).send({message: 'Forbidden'});
            return;
        }
        let query = {};
        if (email) {
            query.email = email;
        }
        const result = await bookingCollection.find(query).toArray();
        res.send(result);
    })

    app.delete('/api/v1/user/cancel-booking/:bookingId', async(req, res) => {
        const id = req.params.bookingId;
        const result = await bookingCollection.deleteOne({_id: new ObjectId(id)});
        res.send(result);
    })

    app.post('/api/v1/auth/access-token', async(req, res) => {
        // creating token and send to client
        const user = req.body || { email: 'mdabarik@gmail.com' };
        const token = jwt.sign(user, secret, {expiresIn: '1h'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none' // different port
        })
        .send({success: true});
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