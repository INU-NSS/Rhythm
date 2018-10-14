const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.7:27017/test', { useNewUrlParser: true });
const collection = {
	pi: require('../collections/pi'),
	web: require('../collections/web'),
	lora: require('../collections/lora')
};

const query = require('./query');

function plot1h(io) {
	
} 

function plot24h(io, field) {
	query.findDay(collection.pi, 'sh').then((dataset) => {
		// io.emit('chart_solra_pi');
		console.log(dataset);
	});
}

function update(io) {
	collection.pi.find().limit(100).sort({'_id': -1}).exec((err, data) => {
		console.log(data);
		io.emit('x', data);
	});

	setTimeout(update, 5000, io);
}

module.exports = function(io) {
	//update(io);
	//plot24h(io, 'sh');
};
