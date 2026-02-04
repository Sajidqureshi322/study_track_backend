const mongoose = require('mongoose');

const db = mongoose.connection;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const checkMongoDbConnection = () => {
  if (db.readyState === 1) console.log('connected to mongo db ');
  else {
    throw new Error('mongo db connection failed');
  }
};

module.exports = { connectDB, checkMongoDbConnection };
