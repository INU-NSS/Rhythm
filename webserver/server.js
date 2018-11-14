const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const https = require('https');
const fs = require('fs');
const ioManager = require('./interfaces/manager');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use('/assets/', express.static(`${__dirname}/assets`));
app.engine('html', require('ejs').renderFile);
app.use(flash());
app.use(session({ secret: 'secret key', saveUninitialized: true, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
const routes = require('./routes')(app, passport);

const options = {
	key: fs.readFileSync('./webserver/keys/private.pem'),
	cert: fs.readFileSync('./webserver/keys/public.pem')
};

const init = (port) => {
	console.log(`[WebServer] listening on port ${port}`);
};

module.exports = (port) => {
	const server = https.createServer(options, app).listen(port, () => {
		init(port);
		ioManager.run(server);
	});
};

// process.on(' uncaughtException', function (err){
// 	console.log(err);
// });
