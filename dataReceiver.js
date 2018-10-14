var Parser = require('binary-parser').Parser;
var io = require('socket.io-client');
var socket = io.connect('https://localhost:443', { rejectUnauthorized : false });

socket.on('connect', function() {
  console.log('# [Proxy] socket connected');
});

const pi = require('./collections/pi');
const web = require('./collections/web');
const lora = require('./collections/lora');
function update() {
	pi.find().limit(1).sort({'_id': -1}).exec((err, data) => {
		socket.emit('pi', { 
			time: data[0].time, 
			solar: data[0].solar, 
			sv: data[0].sv,
			sh: data[0].sh
		});
	});

	web.find().limit(1).sort({'_id': -1}).exec((err, data) => {
		//console.log(data);
		socket.emit('web', { time: data[0].time, solar: data[0].solar, energy: data[0].energy });
	});

	lora.find().limit(1).sort({'_id': -1}).exec((err, data) => {
		//console.log(data);
		socket.emit('lora', { time: data[0].time, solar: data[0].solar, energy: data[0].energy });
	});
}

setInterval(update, 5000);

/* modified */
const manager = require('./data_center/query');
async function update1h() {
	var data = await manager.findRecentData(pi, 'sv');
	socket.emit('pi1h', data);
}

setInterval(update1h, 5000);

async function update24h() {
	var data = {
		solar:  await Promise.all([
			manager.findDay(pi, 'sv'),
			manager.findDay(web, 'solar'),
			manager.findDay(lora, 'solar')
		]),
		energy: await Promise.all([
			manager.findDay(pi, 'solar'),	// must be replaced with energy related field
			manager.findDay(web, 'energy'),
			manager.findDay(lora, 'energy')
		])
	};
	socket.emit('solar24h', data.solar);
	socket.emit('energy24h', data.energy);
}

setInterval(update24h, 5000);

socket.on('req', (data) => {
	switch(data) {
		case 'update1h': update1h(); break;
		case 'update24h': update24h(); break;
		case 'update': update(); break;
	}
});
