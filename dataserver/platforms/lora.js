const mqtt = require('mqtt').connect('mqtt://192.168.0.7');
const Parser = require('binary-parser').Parser;

mqtt.on('connect', () => {
	mqtt.subscribe('lora/+/up');//eui등록할때 코드수정
});

function getData() {
	return new Promise((resolve, reject) => {
		mqtt.on('message', (topic, payload) => {
			var x = JSON.parse(payload);
			var y = Buffer.from(x.data, 'base64');
			var z = new Parser()
				.uint8('code')
				.floatbe('value');
			x.solar = z.parse(y.slice(0, 5)).value;
			x.temp = z.parse(y.slice(5, 10)).value;
			x.energy = z.parse(y.slice(0,5)).value*0.75 /1000;
			resolve(x);
			
			
		});
	});
}

module.exports.getData = getData;
