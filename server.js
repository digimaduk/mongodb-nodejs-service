const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./db.js');
// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// const User = mongoose.model('User', new mongoose.Schema({
//   name: String,
//   email: String
// }));

const User = require('./models/User');

const AppModel = mongoose.model('AppModel', new mongoose.Schema({
  category: String,
  name: String,
  url: String
}));

// API route
app.get('/', (req, res) => {
  res.send('Node Express Service running');
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/api/links', async (req, res) => {
  const links = await AppModel.find();
  res.json(links);
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// app.post('/api/links', async (req, res) => {
//   try {
//     const appmodel = await AppModel.create(req.body);
//     res.json(appmodel);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

app.post('/api/links', async (req, res) => {
  try {
    const links = req.body; // expecting an array of links objects

    if (!Array.isArray(links)) {
      return res.status(400).json({ error: 'Request body must be an array of links' });
    }

    const inserted = await AppModel.insertMany(links);

    res.status(201).json({
      message: 'Links added successfully',
      count: inserted.length,
      links: inserted
    });
  } catch (err) {
    console.error('Error inserting links:', err);
    res.status(500).json({ error: 'Failed to add links' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express Server running on ${PORT}`));