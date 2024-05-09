const express = require('express');
const app = express();
// const cors = require('cors');
const mongoose = require('mongoose')

app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ndjedjos:test@cluster0.mubsi4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// run().catch(console.dir);
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.urlencoded({extended: true}))
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = 3001;
// const environment = process.env.ENVIRONMENT
// const client_id = process.env.CLIENT_ID
// const client_secret = process.env.CLIENT_SECRET;
// const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com': 'https://api-m.paypal.com';
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.get('/home', (req,res) =>{
//   res.send("Payment completed");
// });

app.post('/home', async (req, res) =>{
  // console.log(req.body)
  const amount = req.body.amount;
  let success = true
  let message = "Payment processed successfully"
  if (amount !== '4.99'){
    success = false
  }

  if (!success){
    message = "Payment did not go through. Please enter the correct amount"
  }

  json = {
    "success": success,
    "message": message,
    "paymentDetails": {
      "amount": req.body.amount,
      "currency": "USD",
      "timestamp": "2024-05-10T12:00:00Z",
      "transactionId": "abc123xyz"
    }
  }
  res.send(json)

  try {
    const client1 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client1.connect();
    const db = client1.db("beetcode_database"); 
    const collection = db.collection("beetcode_collection"); 
    await collection.insertOne(json);
    console.log("json inserted into MongoDB");
  } catch (error) {
    console.error("Error inserting payment details into MongoDB:", error);
  }
  // console.log(json)
  

});

// app.post('/create_order', (req, res) => {
//   get_access_token() // after access token building a json that a customer can use
//       .then(access_token => {
//           let order_data_json = {
//               'intent': req.body.intent.toUpperCase(),
//               'purchase_units': [{
//                   'amount': {
//                       'currency_code': 'USD',
//                       'value': '4.99'
//                   }
//               }]
//           };
//           const data = JSON.stringify(order_data_json)

//           fetch(endpoint_url + '/v2/checkout/orders', { //https://developer.paypal.com/docs/api/orders/v2/#orders_create
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authorization': `Bearer ${access_token}`
//                   },
//                   body: data
//               })
//               .then(res => res.json())
//               .then(json => {
//                   res.send(json);
//               }) //send minimal data to client (securiy reason)
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).send(err)
//       })
// });

// app.post('/complete_order', (req, res) => {
//   get_access_token()
//       .then(access_token => {
//           fetch(endpoint_url + '/v2/checkout/orders/' + req.body.order_id + '/' + "CAPTURE", {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authorization': `Bearer ${access_token}`
//                   }
//               })
//               .then(res => res.json())
//               .then(json => {
//                   console.log(json);
//                   res.send(json);
//               }) //Send minimal data to client
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).send(err)
//       })
// });
// function get_access_token() {
//   const auth = `${client_id}:${client_secret}`
//   const data = 'grant_type=client_credentials'
//   return fetch(endpoint_url + '/v1/oauth2/token', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
//           },
//           body: data
//       })
//       .then(res => res.json())
//       .then(json => {
//           return json.access_token;
//       })
// }
