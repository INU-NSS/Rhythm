const query = require('../../db/queries/query');
const {pi, web, lora} = query.collections;
var date = [new Date().toLocaleString(), ''].join('').slice(0, 10);
var hh = new Date().getHours();

async function update(io) {
	
	const solar = await Promise.all([
		query.findDay(lora, 'solar'),
		query.findDay(web, 'solar'),
		query.findDay(pi, 'sv')
	]);

	const energy = await Promise.all([
		query.findDay(lora, 'energy'),
		query.findDay(web, 'energy'),
		query.findDay(pi, 'energy2')
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
