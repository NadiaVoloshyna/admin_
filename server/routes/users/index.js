const router = require('express').Router();

require('./users.role.get')(router);
require('./users.invite.post')(router);
require('./users.[id].put')(router);
require('./users.[id].roles.patch')(router);
require('./users.get')(router);
require('./users.[id].get')(router);
require('./users.put')(router);
require('./users.status.patch')(router);

module.exports = router;
