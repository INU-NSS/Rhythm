const net = require('net');
const socket = new net.Socket();

socket.connect(1553, 'nms.iptime.org');
socket.on('connect', () => {
	var data = new Uint8Array([0, 0, 0, 0, 0, 6, 1, 3, 0, 0, 0, 27]);
	socket.write(Buffer.from(data.buffer));
});

socket.on('close', () => {
	socket.connect(1553, 'nms.iptime.org');
});

function getData() {
	return new Promise((resolve, reject) => {
		socket.on('data', (x) => {
			var data = { 
				idx: Buffer.from([ x[0], x[1] ]).readUInt16BE(0),
				energy: Buffer.from([ x[31], x[32] ]).readUInt16BE(0),
				sv: Buffer.from([ x[55], x[56] ]).readUInt16BE(0),
				sh: Buffer.from([ x[57], x[58] ]).readUInt16BE(0)
			};
			resolve(data);
		});
	});
}

module.exports.getData = getData;
