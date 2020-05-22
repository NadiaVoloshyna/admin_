const router = require('express').Router(); 

require('./professions.get')(router)
require('./professions.post')(router)
require('./professions.delete')(router)

module.exports = router; 