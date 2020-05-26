const router = require('express').Router();

require('./images_deprecated.[id].get')(router); 
require('./images_deprecated.post')(router);

module.exports = router; 