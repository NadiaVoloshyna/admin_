const express = require('express')
const next = require('next')
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config()

const resolvers = require('./server/resolvers');
const typeDefs = require('./server/typeDefs');
const models = require('./server/models');
const DB = require('./server/db');

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: true })
const handle = app.getRequestHandler()

DB.connect();

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => models,
    formatError: (error) => {
      console.log(error);
      return {
        message: error.message,
        extensions: error.extensions
      }
    }
});

app.prepare().then(() => {
  const server = express();

  apollo.applyMiddleware({ app: server });

  server.use(require('./server/routes'));
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});