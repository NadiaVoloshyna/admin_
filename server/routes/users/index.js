const router = require('express').Router();

require('./users.role.get')(router);
require('./users.invite.post')(router);
require('./users.[id].put')(router);
require('./users.[id].roles.patch')(router);
require('./users.get')(router);

module.exports = router;
