const { query } = require('express-validator');
const canShowRegistrationForm = require('../../middlewares/guards/canShowRegistrationForm');

module.exports = (router) => {
  // Render registration form
  router.get('/register', [
    query('token', 'Token is invalid')
      .exists()
      .escape()
      .custom(value => value.length === 32)
  ], canShowRegistrationForm);
};
