const connect = require('./connect');
const Person = require('./models/person');
const Media = require('./models/media');

module.exports = {
  connect,
  collections: {
    Person,
    Media
  }
}