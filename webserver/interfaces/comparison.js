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
	//console.log(date);
	//console.log(dd);
	//console.log(d2);

	return new Promise((resolve, reject) => {
		if ( 0<=hh && hh<9){
			
			//console.log(d2);
			var x = [d2, 'T', '0'+hh, ':00:00'].join('');	
		}
		else if( hh==9){
			var x = [date, 'T','0'+hh, ':00:00'].join('');	
		}
		else {
			var x = [date, 'T', hh, ':00:00'].join('');	
		}
		//if(hh<20 && hh>=08){
		lora.find().where('time').gte(x).exec((err, data) => {
			var tmp = 0;
			var idx = 0;
			//var pex = 0;
			//console.log(data);
			for(var i=0; i<data.length; i++) {
			tmp += data[i].solar;
			idx += data[i].energy;
			//pex += data[i].sh;
			}
			tmp /= (data.length*1000);
			//pex /= (data.length*1000);
			idx /= data.length;
			resolve({
				
				time: x,
				solar: tmp.toFixed(3),
				//sh: pex.toFixed(3),
				energy: idx.toFixed(2),
				
		})
		});
		//}
		// else {
		// 	web.find().where('time').gte(x).exec((err, data) => {
		// 		var t=0;
		// 		var z=0;
		// 		var p=0;
		// 	resolve({
		// 	time: x,
		// 	solar: t,
		// 	sh: p,
		// 	energy: z,
		// })
		// 	});

		// }
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
			
			//console.log(d2);
			var x = [d2, 'T', '0'+hh, ':00:00'].join('');	
		}
		else if( hh==9){
			var x = [date, 'T','0'+hh, ':00:00'].join('');	
		}
		else {
			var x = [date, 'T', hh, ':00:00'].join('');	
		}
		
		
	//if(hh<20 && hh>=08){
		web.find().where('time').gte(x).exec((err, data) => {
			var tmp = 0;
			var idx = 0;
			//console.log(data);
			for(var i=0; i<data.length; i++) {
			tmp += data[i].solar;
			idx += data[i].energy;
			}
			tmp /= (data.length*1000);
			idx /= data.length;

			resolve({
					time: x,
					solar: tmp.toFixed(3),
					energy: idx.toFixed(2),
				
			})
			
		});
	//}
	
	// else{
	// 		web.find().where('time').gte(x).exec((err, data) => {
	// 			var t=0;
	// 			var z=0;
	// 		resolve({
	// 		time: x,
	// 		solar: t,
	// 		energy: z,
	// 	})
	// 		});
	// }
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
			
			//console.log(d2);
			var x = [d2, 'T', '0'+hh, ':00:00'].join('');	
		}
		else if( hh==9){
			var x = [date, 'T','0'+hh, ':00:00'].join('');	
		}
		else {
			var x = [date, 'T', hh, ':00:00'].join('');	
		}
		// if(hh >20 && hh <= 08){
		// 	web.find().where('time').gte(x).exec((err, data) => {
		// 		var t=0;
		// 		var z=0;
		// 		var p=0;
		// 	resolve({
		// 	time: x,
		// 	solar: t,
		// 	sh: p,
		// 	energy: z,
		// })
		// 	});
		// }
		//if(hh<20 && hh>=08){
		pi.find().where('time').gte(x).exec((err, data) => {
			//console.log(x);
			//console.log(data);
			var tmp = 0;
			var idx = 0;
			var pex = 0;
			for(var i=0; i<data.length; i++) {
			tmp += data[i].sv;
			idx += data[i].energy;
			pex += data[i].sh;
			}
			tmp /= (data.length*1000);
			idx /= (data.length*1000);;
			pex /= (data.length*1000);
			resolve({
				time: x,
				solar: tmp.toFixed(3),
				energy: idx.toFixed(3),
				sh: pex.toFixed(3),
			
		})
		});
	//}
	// else {
	// 	web.find().where('time').gte(x).exec((err, data) => {
	// 				var t=0;
	// 				var z=0;
	// 				var p=0;
	// 			resolve({
	// 			time: x,
	// 			solar: t,
	// 			sh: p,
	// 			energy: z,
	// 		})
	// 			});
	// }
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
