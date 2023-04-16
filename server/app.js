const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(cors());

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

    res.status(200).send({ role: user.role });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
