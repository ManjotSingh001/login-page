const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb+srv://admin:manjotsingh2197@cluster0.4xhovjg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
}

connectDB();


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading users data');
      return;
    }

    const users = JSON.parse(data);

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }

    // Send the user role, user ID, and additional fields in the response
    res.status(200).send({
      role: user.role,
      id: user.id,
      father_name: user.father_name,
      URN: user.URN,
      CRN: user.CRN
    });
  });
});


app.get('/api/data', async (req, res) => {
  try {
    const collection = client.db('req').collection('pending');
    const data = await collection.find().toArray();
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});


// Add this route to your app.js
app.post('/api/generate-request', async (req, res) => {
  const { studentId, requestDetails, fatherName, URN, CRN } = req.body;

  try {
    const collection = client.db('req').collection('pending');
    const result = await collection.insertOne({ studentId, requestDetails, fatherName, URN, CRN, createdAt: new Date() });

    res.status(201).json({ success: true, message: 'Request generated successfully' });
  } catch (err) {
    console.error('Error generating request:', err);
    res.status(500).json({ success: false, message: 'Failed to generate request' });
  }
});

app.get('/pending-requests', async (req, res) => {
  try {
    const requestsCollection = client.db('req').collection('pending');
    const pendingRequests = await requestsCollection.find({ status: 'pending' }).toArray();

    res.status(200).send(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).send('Error fetching pending requests');
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
