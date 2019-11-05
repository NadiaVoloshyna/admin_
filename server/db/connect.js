const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-s1beo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connection.on('open', function () {
    mongoose.gridfs = gridfs(mongoose.connection.db, mongoose.mongo);
    console.log('Connected to mongo server.');
});

module.exports = async () => {
  try {
    await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
  } catch (error) {
    throw error;
  }
}