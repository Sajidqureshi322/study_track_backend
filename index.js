const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { connectDB } = require('./config/DatabaseConnection');
const usersRoute = require('./routes/UserRoutes');

dotenv.config();

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

// Body parser
app.use(express.json());

// CORS (production standard)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Study Tracker API is running'
  });
});

// User routes
app.use('/api/users', usersRoute);


/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});


/*
|--------------------------------------------------------------------------
| Server Initialization
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {

    console.error("❌ Server startup failed:", error.message);
    process.exit(1);

  }
};

startServer();

module.exports = app;
