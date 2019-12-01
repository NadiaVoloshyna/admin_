const express = require('express')
const next = require('next')
const { logger } = require('./server/loggers');

require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const authService = require('./server/services/auth');

const resolvers = require('./server/resolvers')(logger);
const typeDefs = require('./server/typeDefs');
const models = require('./server/models');
const DB = require('./server/db');
const routes = require('./server/routes');

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: true })
const handle = app.getRequestHandler();

DB.connect(logger);

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => models,
    formatError: (error) => {
      logger.error(error);

      return {
        message: error.message,
        extensions: error.extensions
      }
    },
    formatResponse: response => {
      logger.debug(response);
      return response;
    },
});

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  authService.initialize(server);

  apollo.applyMiddleware({ app: server });

  routes(server, logger);
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});