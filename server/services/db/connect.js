const mongoose = require('mongoose');

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-yr0be.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

module.exports = async (logger) => {
  try {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}