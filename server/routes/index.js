const imagesRoutes = require('./images');
const authRoutes = require('./auth');
const personRoutes = require('./person');
const userRoutes = require('./user');
const professionsRoutes = require('./professions');
const restrictAccess = require('../middlewares/guards/restrictAccess');

module.exports = (app, logger) => {
  app.use('/auth', authRoutes);

  app.use('/api/images', imagesRoutes);
  app.use('/api/persons', personRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/professions', professionsRoutes);
}