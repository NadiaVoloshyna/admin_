const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const password = require('passport');
const next = require('next');
const { logger } = require('./server/loggers');

require('dotenv').config();
require('./server/services/passport');

const DB = require('./server/services/db');
const routes = require('./server/routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, quiet: true });
const handle = app.getRequestHandler();

DB.connect(logger);

app.prepare().then(() => {
  const server = express();

  const sessionConfig = {
    secret: 'secret',
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: false
  };

  server.use(cookieParser('secret'));
  server.use(session(sessionConfig));

  // Express Session
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(password.initialize());
  server.use(password.session());

  // server.use(fileUpload());

  routes(server, logger);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 8080;
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
