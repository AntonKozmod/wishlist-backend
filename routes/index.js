const Router = require('express');
const router = new Router();

require('./routes/user.routes')(router);

module.exports = router;