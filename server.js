const express = require('express')
const next = require('next')
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config()

const { typeDefs, resolvers } = require('./server/schema');
const DB = require('./server/db');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: true })
const handle = app.getRequestHandler()

DB.connect();

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        Person: DB.collections.Person,
        Media: DB.collections.Media,
      };
    },
    formatError: (error) => ({
      message: error.message,
      code: error.extensions.code
    })
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