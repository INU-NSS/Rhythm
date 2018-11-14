const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.0.7/test', { useNewUrlParser: true });
const {today, tomorrow} = require('../utils/date_util');
const collections = {
	pi: require('../collections/pi'),
	web: require('../collections/web'),
	lora: require('../collections/lora'),
};

/* retrive recent data for an hour(180 documents) of any collections */
const findHour = (collection, field) => {
	return new Promise((resolve, reject) => {
		collection.find().limit(180).sort({'_id': -1}).exec((err, data) => {
			const x = data.map((a) => {
				let t = new Date(a.time);
				return [t.getHours(), ':', t.getMinutes(), ':', t.getSeconds()].join('');
			});
			const y = data.map((a) => { return a[field]; });
			resolve({ labels: x.reverse(), data: y.reverse() });
		});
	});
};

/* retrieve data for today of any collections */
const findDay = (collection, field) => {
	return new Promise((resolve, reject) => {
		collection.find().where('time').gte(today()).lt(tomorrow()).exec((err, data) => {
			resolve(toDataSet(data, field));
		});
	});
};

/* average a field data over 10 minutes and form dataset for chart.js */
const toDataSet = (data, field) => {
	var temp = [];
	data.forEach((a) => {
		let idx = getTimeIndex(a.time);
		//console.log(a.time);
		if(temp[idx] === undefined) temp[idx] = [];
		temp[idx].push(a[field]);
		
	}); 
	for(let i=0; i<temp.length; i++) if(temp[i] === undefined) temp[i] = [0];

	const y = temp.map((a) => { return average(a); });
	const x = y.map((a, idx) => {
		let hh = Math.floor((idx *10) /60);
		let mm = (idx *10) %60;
		//console.log(hh);
		return [(hh>9) ? '':'0', hh, ':', (mm>9) ? '':'0', mm].join('');
	});

	return { labels: x, data: y };
};

const average = (x) => {
	return x.reduce((a, b) => { return a +b; }) /x.length;
};

const getTimeIndex = (x) => {
	let dt = (x - today()) /60000;
	return Math.round(dt /10);
};

module.exports = {
	findHour: findHour,
	findDay: findDay,
	collections: collections
};
