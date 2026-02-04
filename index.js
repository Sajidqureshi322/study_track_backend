const express = require('express');
const dotenv = require('dotenv');
const { connectDB, checkMongoDbConnection } = require('./config/mongodb');

dotenv.config();

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const PORT = process.env.PORT;

connectDB();
checkMongoDbConnection();
app.get('/', (req, res) => {
  res.json({ message: 'Study Tracker API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
