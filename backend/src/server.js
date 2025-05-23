// Server entry point: connects to MongoDB and starts Express server
const config = require('./config');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = config.PORT;
const MONGO_URI = config.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
