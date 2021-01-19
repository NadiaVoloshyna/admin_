const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const password = require('passport');
const next = require('next');
const { logger, auditLogger } = require('./server/services/gcp/logger');

require('dotenv').config();

const DB = require('./server/services/db');
const routes = require('./server/routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, quiet: !dev });
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

  const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
      // no larger than 5mb.
      fileSize: 5 * 1024 * 1024,
    },
  });

  server.use(multerMiddleware.single('file'));
  server.use(cookieParser('secret'));
  server.use(session(sessionConfig));

  // Express Session
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(password.initialize());
  server.use(password.session());
  server.use(auditLogger);

  // eslint-disable-next-line global-require
  require('./server/services/passport');

  routes(server);

  server.all('*', handle);

  const PORT = process.env.PORT || 8080;
  server.listen(PORT, (err) => {
    if (err) throw err;
    logger.info(`Ready on http://localhost:${PORT}`);
  });
});
