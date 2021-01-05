const canShowRegistrationForm = require('../../middlewares/guards/canShowRegistrationForm');

module.exports = (router) => {
  // Render registration form
  router.get('/register', canShowRegistrationForm);
};
