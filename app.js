const config = require('./config/config.js');
const webserver = require('./webserver/server')(config.app.port);
const dataserver = require('./dataserver/server');
