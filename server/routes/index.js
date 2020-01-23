//const imagesRoutes = require('./images');
const authRoutes = require('./auth');
const personRoutes = require('./person');
const usersRoutes = require('./users');
const professionsRoutes = require('./professions');
const assetsRoutes = require('./assets');
const restrictAccess = require('../middlewares/guards/restrictAccess');

module.exports = (app, logger) => {
  app.use('/auth', authRoutes);

  //app.use('/api/images', imagesRoutes);
  app.use('/api/persons', personRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/professions', professionsRoutes);
  app.use('/api/assets', assetsRoutes);
}