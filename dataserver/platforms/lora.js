/* 
 * 2018.12.14
 * 발전량 구하는 법 
 * [reference](https://photovoltaic-software.com/principle-ressources/how-calculate-solar-energy-power-pv-systems)
 * [reference] (https://www.irjet.net/archives/V4/i9/IRJET-V4I980.pdf)
 * [reference] (http://www.paawan-energy.com/downloads/SOLARPVBASICS.pdf)
 */

const config = require('../../config/config.js');
const {mqtt:{host, port}} =config;
const connectString = `mqtt://${host}:${port}`;
const mqtt = require('mqtt').connect(connectString);
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
			//x.sh = (x.solar*0.84).toFixed(0);
			x.temp = z.parse(y.slice(5, 10)).value;
			x.energy = z.parse(y.slice(0,5)).value*0.75*8*0.16 /1000;
			resolve(x);
			//console.log(x.solar);
			
		});
	});
}

module.exports.getData = getData;
