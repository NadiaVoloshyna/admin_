const session = require("express-session");
const password = require('passport');
require('../passport');

const initialize = (app) => {
  const sessionConfig = {
    secret: 'secret',
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true
  };

  // Express Session
  app.use(session(sessionConfig));
  app.use(password.initialize());
  app.use(password.session());
}

module.exports = {
  initialize
}