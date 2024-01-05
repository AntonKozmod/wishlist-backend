const Router = require('express');
const router = new Router();

require('./user.routes')(router);
require('./post.routes')(router);

module.exports = router;
