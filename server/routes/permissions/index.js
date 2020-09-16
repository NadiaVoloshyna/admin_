const router = require('express').Router();

require('./permissions.get')(router);
require('./permissions.post')(router);
require('./permissions.put')(router);
require('./permissions.delete')(router);

module.exports = router;
