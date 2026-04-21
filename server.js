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
const Link = require('./models/Link');
const Question = require('./models/Question');
const Fact = require('./models/Fact');
const Contact = require('./models/Contact');
const Topic = require('./models/Topic');

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
  console.log('Getting Users Info');
  const users = await User.find();
  res.json(users);
});

// app.get('/api/links', async (req, res) => {
//   const links = await AppModel.find();
//   res.json(links);
// });

app.get('/api/links', async (req, res) => {
try {
    console.log('Getting Links Info');
    const links = await Link.find({}, "name category url"); 
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

app.post('/api/questions', async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create question' });
  }
});

app.get('/api/questions', async (req, res) => {
try {
    console.log('Getting questions Info');
    const questions = await Question.find(); 
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/questions?category=UK History
app.get("/api/questions", async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    const questions = await Question.find({ category });

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });

  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


app.get('/api/facts', async (req, res) => {
try {
    console.log('Getting Fact Info');
    const facts = await Fact.find(); 
    res.json(facts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// GET /api/topics/slug
app.get("/api/topics", async (req, res) => {
  try {
    console.log('Getting Topic Info');
    const topic = await Topic.findOne({ slug: req.params.slug });
    res.json(topic);
  } catch (error) {
    console.error("Error fetching Topic:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express Server running on ${PORT}`));