const mongoose = require('mongoose');
const config = require('../config/config.js');
const {db:{host, port, name}} = config;
const connectString = `mongodb://${host}/${name}`;
mongoose.connect(connectString, { useNewUrlParser: true });
var date = [new Date().toLocaleString(), ''].join('').slice(0, 10);
var hh = new Date().getHours();
//console.log(hh);
var x = [date, 'T', hh, ':00:00'].join('');

var collection  = {
	pi: require('../db/collections/pi.js'),
	web: require('../db/collections/web.js'),
	lora: require('../db/collections/lora.js')
};

var platform = {
	pi: require('./platforms/pi.js'),
	web: require('./platforms/web.js'),
	lora: require('./platforms/lora.js')
};

async function update() {
	if( 7<hh && hh<20 ) {
		collection.pi.insert(await platform.pi.getData());
		collection.lora.insert(await platform.lora.getData());
		collection.web.insert(await platform.web.getData());

		setTimeout(update, 10*1000);
	}
	else {
		collection.pi.insert(await platform.pi.getData());
		collection.lora.insert(await platform.lora.getData());
		collection.web.insert(await platform.web.err());
	
		setTimeout(update, 10*1000);
	}
}

update();

module.exports = console.log('Dataserver is running');
