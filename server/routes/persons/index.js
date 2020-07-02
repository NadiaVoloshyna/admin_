const router = require('express').Router();

require('./persons.[id].get')(router);
require('./persons.[id].permissions.post')(router);
require('./persons.[id].put')(router);
require('./persons.[id].status.put')(router);
require('./persons.delete')(router);
require('./persons.get')(router);
require('./persons.post')(router);

module.exports = router;
