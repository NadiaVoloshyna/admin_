const authRoutes = require('./auth');
const personsRoutes = require('./persons');
const usersRoutes = require('./users');
const professionsRoutes = require('./professions');
const assetsRoutes = require('./assets');
const logsRoutes = require('./_log');

// Middlewares
const errorHandlers = require('../middlewares/errorHandlers');
const restrictAccess = require('../middlewares/guards/restrictAccess');

module.exports = (app) => {
  // API routes
  app.use('/api/persons', errorHandlers, personsRoutes);
  app.use('/api/users', errorHandlers, usersRoutes);
  app.use('/api/professions', errorHandlers, professionsRoutes);
  app.use('/api/assets', errorHandlers, assetsRoutes);

  // Platform routes
  app.use('/api/__log__', errorHandlers, logsRoutes);

  // Page routes
  app.use('/persons', restrictAccess);
  app.use('/library', restrictAccess);
  app.use('/professions', restrictAccess);
  app.get('/', restrictAccess);
  app.use('/auth', errorHandlers, authRoutes);
};
