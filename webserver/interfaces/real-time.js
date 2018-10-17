const query = require('../../db/queries/query');
const {pi, web, lora} = query.collections;

async function update(io) {
//	const solar = await query.findHour(pi, 'sv');
	const solar = await query.findHour(lora, 'solar');
	io.emit('real-time', solar );
} 

const run = (io) => {
	setInterval(update, 5000, io);
};

module.exports = {
	event: 'real-time',
	update: update,
	run: run
};
