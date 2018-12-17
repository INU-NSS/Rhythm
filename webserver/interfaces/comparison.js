const query = require('../../db/queries/query');
const {pi, web, lora} = query.collections;
const mongoose = require('mongoose');
const fs = require('fs');
mongoose.connect('mongodb://192.168.0.7/test', { useNewUrlParser: true });
mongoose.Promise = global.Promise;


const lorasRa = () => {
	var date = [new Date().toISOString(), ''].join('').slice(0, 10);
	var hh = new Date().getHours();
	var dd= new Date();
	dd.setDate(dd.getDate() +1);
	var d2 = [dd.toISOString(), ''].join('').slice(0, 10);


	return new Promise((resolve, reject) => {
		if ( 0<=hh && hh<9){
			

			var x = [d2, 'T', '0'+hh, ':00:00'].join('');	
		}
		else if( hh==9){
			var x = [date, 'T','0'+hh, ':00:00'].join('');	
		}
		else {
			var x = [date, 'T', hh, ':00:00'].join('');	
		}

		lora.find().where('time').gte(x).exec((err, data) => {
			var tmp = 0;
			var idx = 0;
			var pex = 0;

			for(var i=0; i<data.length; i++) {
			tmp += data[i].solar;
			idx += data[i].energy;
			}
			tmp /= (data.length*1000);
			idx /= data.length;
			if(hh==9) pex =tmp*0.722048;
			else if(hh==10) pex =tmp*0.740988;
			else if(hh==11) pex =tmp*0.742274;
			else if(hh==12) pex =tmp*0.74542;
			else if(hh==13) pex =tmp*0.770166;
			else if(hh==14) pex =tmp*0.797955;
			else if(hh==15) pex =tmp*0.758472;
			else if(hh==16) pex =tmp*0.752966;
			else if(hh==17) pex =tmp*0.863955;
			else pex = 0;
			resolve({
				
				time: x,
				solar: tmp.toFixed(3),
				sh: pex.toFixed(3),
				energy: idx.toFixed(3),
				
		})
		});

	});
};

const webRa = () => {
	var date = [new Date().toISOString(), ''].join('').slice(0, 10);
	var dd= new Date();
	dd.setDate(dd.getDate() +1);
	var d2 = [dd.toISOString(), ''].join('').slice(0, 10);
	var hh = new Date().getHours();
	var hh2 =new Date().getHours();
	return new Promise((resolve, reject) => {
		if ( 0<=hh2  && hh2 < 9){
			

			var x = [d2, 'T', '0'+hh, ':00:00'].join('');	
		}
		else if( hh==9){
			var x = [date, 'T','0'+hh, ':00:00'].join('');	
		}
		else {
			var x = [date, 'T', hh, ':00:00'].join('');	
		}
		
		

		web.find().where('time').gte(x).exec((err, data) => {
			var tmp = 0;
			var idx = 0;
			var pex = 0;
			var dex = 0;

			for(var i=0; i<data.length; i++) {
			tmp += data[i].solar;
			pex += data[i].solarzh;
			dex += data[i].solarfzh;
			idx += data[i].energy;
			
			
			}
			tmp /= (data.length*1000);
			pex /= (data.length*1000);
			dex /= (data.length*1000);
			idx /= data.length;
			

			resolve({
					time: x,
					solar: tmp.toFixed(3),
					solarzh: pex.toFixed(3),
					solarfzh: dex.toFixed(3),
					energy: idx.toFixed(3),
				
			})
			
		});

	});
};

const PiRa = () => {
   
    var date = [new Date().toISOString(), ''].join('').slice(0, 10);
	var hh = new Date().getHours();
	var dd= new Date();
	dd.setDate(dd.getDate() +1);
	var d2 = [dd.toISOString(), ''].join('').slice(0, 10);
	return new Promise((resolve, reject) => {
		if ( 0<=hh && hh < 9){

			var x = [d2, 'T', '0'+hh, ':00:00'].join('');	
		}
		else if( hh==9){
			var x = [date, 'T','0'+hh, ':00:00'].join('');	
		}
		else {
			var x = [date, 'T', hh, ':00:00'].join('');	
		}

		pi.find().where('time').gte(x).exec((err, data) => {			
			var tmp = 0;
			var idx = 0;
			var pex = 0;
			for(var i=0; i<data.length; i++) {
			tmp += data[i].sv;
			idx += data[i].energy2;
			pex += data[i].sh;
			}
			tmp /= (data.length*1000);
			idx /= (data.length);
			pex /= (data.length*1000);
			resolve({
				time: x,
				solar: tmp.toFixed(3),
				energy: idx.toFixed(3),
				sh: pex.toFixed(3),
			
		})
		});
	
	});
};

async function update(io) {

	const data = await Promise.all([
		PiRa(),
		webRa(),
		lorasRa(),
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
