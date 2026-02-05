const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/mongodb');

dotenv.config();

const app = express();

app.use(express.json());

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

const startServer = async () => {
  try {
    await connectDB(); 
    console.log("Server is running on port ", PORT);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();

const usersRoute = require('./routes/users_route');
app.use('/users', usersRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Study Tracker API is running' });
});

module.exports = app;
