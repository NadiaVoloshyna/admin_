const express = require('express')
const next = require('next')
const pino = require('pino');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config()

const logger = pino({
  level: process.env.debug === true ? 'debug' : 'info'
});

const resolvers = require('./server/resolvers')(logger);
const typeDefs = require('./server/typeDefs');
const models = require('./server/models');
const DB = require('./server/db');
const routes = require('./server/routes')(logger);

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

  apollo.applyMiddleware({ app: server });

  server.use(routes);
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});