const query = require('../../db/queries/query');
const {pi, web, lora} = query.collections;

async function update(io) {
	const data = await Promise.all([
		pi.find().limit(1).sort({'_id': -1}).exec(),
		web.find().limit(1).sort({'_id': -1}).exec(),
		lora.find().limit(1).sort({'_id': -1}).exec(),
	]);

	io.emit('comparison', { pi: data[0], web: data[1], lora: data[2] });
} 

const run = (io) => {
	setInterval(update, 5000, io);
};

module.exports = {
	event: 'comparison',
	update: update,
	run: run
};
