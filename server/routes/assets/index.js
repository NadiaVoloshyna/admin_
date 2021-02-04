const router = require('express').Router();

require('./assets.[id].put')(router);
require('./assets.[id].delete')(router);
require('./assets.get')(router);
require('./assets.post')(router);
require('./assets.breadcrumbs.get')(router);

module.exports = router;
