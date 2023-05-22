const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');

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

    res.status(200).send({
      role: user.role,
      id: user.id,
      father_name: user.father_name,
      URN: user.URN,
      CRN: user.CRN,
      department: user.department
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
app.post('/api/generate-request', async (req, res) => {
  const { studentId, requestDetails, fatherName, URN, CRN, department } = req.body;

  try {
    const collection = client.db('req').collection('pending');
    const result = await collection.insertOne({
      studentId,
      requestDetails,
      fatherName,
      URN,
      CRN,
      department,
      status: 'pending', // Set the status field to "pending"
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, message: 'Request generated successfully' });
  } catch (err) {
    console.error('Error generating request:', err);
    res.status(500).json({ success: false, message: 'Failed to generate request' });
  }
});


app.get('/api/pending-requests', async (req, res) => {
  try {
    const requestsCollection = client.db('req').collection('pending');
    const pendingRequests = await requestsCollection.find({ status: 'pending' }).toArray();

    res.status(200).send(pendingRequests);
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).send('Error fetching pending requests');
  }
});


app.post("/api/approve-requests", async (req, res) => {
  const requestIds = req.body.requestIds;

  try {
    const requestsCollection = client.db("req").collection("pending");

    // Update requests with the given IDs
    await requestsCollection.updateMany(
      { _id: { $in: requestIds.map((id) => new ObjectId(id)) } },
      { $set: { status: "approved" } }
    );

    const approvedRequests = await requestsCollection.find({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } }).toArray();
    const approvedRequestsCollection = client.db("req").collection("approved_requests");
    await approvedRequestsCollection.insertMany(approvedRequests);
    await requestsCollection.deleteMany({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error approving the request:", error);
    res.status(500).send("Error approving the request");
  }
});

app.get("/api/approved-requests", async (req, res) => {
  try {
    const approvedRequestsCollection = client.db("req").collection("approved_requests");
    const approvedRequests = await approvedRequestsCollection.find().toArray();

    res.status(200).send(approvedRequests);
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    res.status(500).send("Error fetching approved requests");
  }
});

app.post('/api/pause-requests', async (req, res) => {
  const requestIds = req.body.requestIds;

  try {
    const requestsCollection = client.db('req').collection('pending');

    // Update requests with the given IDs
    await requestsCollection.updateMany(
      { _id: { $in: requestIds.map((id) => new ObjectId(id)) } },
      { $set: { status: 'paused' } }
    );

    const pausedRequests = await requestsCollection.find({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } }).toArray();
    const pausedRequestsCollection = client.db('req').collection('paused');
    await pausedRequestsCollection.insertMany(pausedRequests);
    await requestsCollection.deleteMany({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error pausing the request:', error);
    res.status(500).send('Error pausing the request');
  }
});

app.get('/api/paused-requests', async (req, res) => {
  try {
    const pausedRequestsCollection = client.db('req').collection('paused');
    const pausedRequests = await pausedRequestsCollection.find().toArray();

    res.status(200).send(pausedRequests);
  } catch (error) {
    console.error('Error fetching paused requests:', error);
    res.status(500).send('Error fetching paused requests');
  }
});
//added for pause approve
app.post("/api/approved-requests-from-paused", async (req, res) => {
  const requestIds = req.body.requestIds;

  try {
    const pausedRequestsCollection = client.db("req").collection("paused");
    const approvedRequestsCollection = client.db("req").collection("approved_requests");

    // Update paused requests with the given IDs
    await pausedRequestsCollection.updateMany(
      { _id: { $in: requestIds.map((id) => new ObjectId(id)) } },
      { $set: { status: "approved" } }
    );

    // Move approved requests to the approved collection
    const pausedRequests = await pausedRequestsCollection.find({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } }).toArray();
    await approvedRequestsCollection.insertMany(pausedRequests);

    // Delete approved requests from the paused collection
    await pausedRequestsCollection.deleteMany({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error approving the request:", error);
    res.status(500).send("Error approving the request");
  }
});


app.get("/api/approved-requests-from-paused", async (req, res) => {
  try {
    const approvedRequestsCollection = client.db("req").collection("approved_requests");
    const approvedRequests = await approvedRequestsCollection.find().toArray();

    res.status(200).send(approvedRequests);
  } catch (error) {
    console.error("Error fetching approved requests:", error);
    res.status(500).send("Error fetching approved requests");
  }
});


//api to revert the paused requests back to pending

app.post('/api/revert-requests', async (req, res) => {
  const requestIds = req.body.requestIds;

  try {
    const pausedRequestsCollection = client.db('req').collection('paused');
    const pendingRequestsCollection = client.db('req').collection('pending');

    // Update paused requests with the given IDs
    await pausedRequestsCollection.updateMany(
      { _id: { $in: requestIds.map((id) => new ObjectId(id)) } },
      { $set: { status: 'pending' } }
    );

    // Move pending requests to the pending collection
    const pausedRequests = await pausedRequestsCollection.find({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } }).toArray();
    await pendingRequestsCollection.insertMany(pausedRequests);

    // Delete approved requests from the paused collection
    await pausedRequestsCollection.deleteMany({ _id: { $in: requestIds.map((id) => new ObjectId(id)) } });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error reverting the request:', error);
    res.status(500).send('Error reverting the request');
  }
});
 
app.get('/api/paused-requests', async (req, res) => {
  try {
    const pausedRequestsCollection = client.db('req').collection('paused');
    const pausedRequests = await pausedRequestsCollection.find().toArray();

    res.status(200).send(pausedRequests);
  } catch (error) {
    console.error('Error fetching paused requests:', error);
    res.status(500).send('Error fetching paused requests');
  }
});


const PORT = process.env.PORT || 3001;
app.listen(3001, () => {
  console.log(`Server running on port ${PORT}`);
});
