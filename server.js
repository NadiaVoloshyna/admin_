const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const password = require('passport');
const fileUpload = require('express-fileupload');
const next = require('next');
const { logger } = require('./server/loggers');

require('dotenv').config();

const DB = require('./server/db');
const routes = require('./server/routes');

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: true })
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

  require('./server/services/passport');

  // server.use(fileUpload());

  routes(server, logger);
  
  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});