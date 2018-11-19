const query = require('../../db/queries/query');
const {pi, web, lora} = query.collections;
var date = [new Date().toLocaleString(), ''].join('').slice(0, 10);
var hh = new Date().getHours();

async function update(io) {
	
	const solar = await Promise.all([
		query.findDay(pi, 'sv'),
		query.findDay(web, 'solar'),
		query.findDay(lora, 'solar')
	]);

	const energy = await Promise.all([
		query.findDay(pi, 'energy'),
		query.findDay(web, 'energy'),
		query.findDay(lora, 'energy')
	]);

	io.emit('charts', { solar: solar, energy: energy });
} 

const run = (io) => {
	setInterval(update, 5000, io);
};

module.exports = {
	event: 'charts',
	update: update,
	run: run
};
