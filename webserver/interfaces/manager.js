module.exports.run = (server) => {
	const io = require('socket.io')(server);
	const chart = require('./charts');
	const real = require('./real-time');
	const comp = require('./comparison');

	io.on('connection', (socket) => {
		socket.on('req', (data) => {
			switch(data) {
				case chart.event: chart.update(io); break;
				case real.event: real.update(io); break;
				case comp.event: comp.update(io); break;
			}
		});
	});

	[chart, real, comp].forEach((a)=> a.run(io));
};
