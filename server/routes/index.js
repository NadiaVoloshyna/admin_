const imagesRoutes = require('./images');
const authRoutes = require('./auth');
const personRoutes = require('./person');
const userRoutes = require('./user');
const restrictAccess = require('../middlewares/guards/restrictAccess');

module.exports = (app, logger) => {
  app.use('/images', imagesRoutes);
  app.use('/auth', authRoutes);

  app.use('/api/persons', personRoutes);
  app.use('/api/users', userRoutes);
}