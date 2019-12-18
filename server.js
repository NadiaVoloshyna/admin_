const express = require('express');
const fileUpload = require('express-fileupload');
const next = require('next');
const { logger } = require('./server/loggers');

require('dotenv').config();

const authService = require('./server/services/auth');

const DB = require('./server/db');
const routes = require('./server/routes');

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: true })
const handle = app.getRequestHandler();

DB.connect(logger);

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use(fileUpload());

  authService.initialize(server);

  routes(server, logger);
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});