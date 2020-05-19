const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-yr0be.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connection.on('open', function () {
  const gfs = Grid(mongoose.connection.db, mongoose.mongo);
  mongoose.gridfs = gfs;

  console.log('Connected to mongo server!');
});

module.exports = async (logger) => {
  try {
    await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}