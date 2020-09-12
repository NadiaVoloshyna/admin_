const authRoutes = require('./auth');
const personsRoutes = require('./persons');
const usersRoutes = require('./users');
const professionsRoutes = require('./professions');
const permissionsRoutes = require('./permissions');
const assetsRoutes = require('./assets');
const logsRoutes = require('./_log');

// Middlewares
const errorHandlers = require('../middlewares/errorHandlers');
const restrictAccess = require('../middlewares/guards/restrictAccess');
const restrictAccessForAuthenticated = require('../middlewares/guards/restrictAccessForAuthenticated');

module.exports = (app) => {
  // API routes
  app.use('/api/persons', errorHandlers, personsRoutes);
  app.use('/api/users', errorHandlers, usersRoutes);
  app.use('/api/professions', errorHandlers, professionsRoutes);
  app.use('/api/assets', errorHandlers, assetsRoutes);
  app.use('/api/permissions', errorHandlers, permissionsRoutes);

  // Platform routes
  app.use('/api/__log__', errorHandlers, logsRoutes);

  // Page routes
  app.use('/persons', restrictAccess);
  app.use('/library', restrictAccess);
  app.use('/professions', restrictAccess);
  app.use('/permissions', restrictAccess);
  app.use('/users', restrictAccess);
  app.get('/', restrictAccess);
  app.use('/auth/login', restrictAccessForAuthenticated);
  app.use('/auth/register', restrictAccessForAuthenticated);
  app.use('/auth', errorHandlers, authRoutes);
};
