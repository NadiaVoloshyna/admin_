// const imagesRoutes = require('./images');
const authRoutes = require('./auth');
const personsRoutes = require('./persons');
const usersRoutes = require('./users');
const professionsRoutes = require('./professions');
const assetsRoutes = require('./assets');
const restrictAccess = require('../middlewares/guards/restrictAccess');

module.exports = (app) => {
  // API routes
  // app.use('/api/images', imagesRoutes);
  app.use('/api/persons', personsRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/professions', professionsRoutes);
  app.use('/api/assets', assetsRoutes);

  // Page routes
  app.use('/persons', restrictAccess);
  app.use('/library', restrictAccess);
  app.get('/', restrictAccess);
  app.use('/auth', authRoutes);
};
