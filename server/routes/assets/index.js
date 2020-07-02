const router = require('express').Router();

require('./assets.[id].put')(router);
require('./assets.[id].delete')(router);
require('./assets.get')(router);
require('./assets.post')(router);

module.exports = router;
