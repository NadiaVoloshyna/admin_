const { body } = require('express-validator');
const errorHandler = require('../../middlewares/errorHandler');
const registerUser = require('../../controllers/user/registerUser');

module.exports = (router) => {
    // Register user
  router.post('/register', [
    body('firstName').exists().escape(),
    body('lastName').exists().escape(),
    body('email').exists().isEmail().escape(),
    body('password').exists().escape(),
    body('token').exists().escape()
  ], errorHandler, registerUser);
}