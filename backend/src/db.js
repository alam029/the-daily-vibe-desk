const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[DB] MongoDB connected:', mongoose.connection.host);
  } catch (err) {
    console.error('[DB] MongoDB connection error:', err.message);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[DB] MongoDB disconnected');
});

module.exports = connectDB;
