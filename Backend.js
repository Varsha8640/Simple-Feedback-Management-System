const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Sample data
let feedbacks = [];

app.use(bodyParser.json());
app.use(cors());

// Get all feedbacks
app.get('/feedbacks', (req, res) => {
  res.json(feedbacks);
});

// Add new feedback
app.post('/feedbacks', (req, res) => {
  const newFeedback = req.body;
  feedbacks.push(newFeedback);
  res.status(201).send();
});

app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});