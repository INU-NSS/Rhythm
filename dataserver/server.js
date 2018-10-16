const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.7/test', { useNewUrlParser: true });

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
	collection.pi.insert(await platform.pi.getData());
	collection.lora.insert(await platform.lora.getData());
	collection.web.insert(await platform.web.getData());

	setTimeout(update, 10*1000);
}

update();

module.exports = console.log('Dataserver is running');
