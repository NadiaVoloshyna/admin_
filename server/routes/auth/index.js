const router = require('express').Router();

require('./auth.logout.get')(router);
require('./auth.google.get')(router);
require('./auth.google.redirect.get')(router);
require('./auth.register.get')(router);
require('./auth.register.post')(router);
require('./auth.login.post')(router);

module.exports = router;
