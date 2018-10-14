const date2 = require('./date2.js');

function findRecentData(collection, field) {
	return new Promise((resolve, reject) => {
		collection.find().limit(180).sort({'_id': -1}).exec((err, data) => {
			// extract useful data (field)
			var x = data.map((a, idx) => { 
				let t = new Date(a.time); 
				return [t.getHours(), ':', t.getMinutes(), ':', t.getSeconds()].join('');
			});
			var y = data.map((a, idx) => { return a[field]; });

			resolve({ labels: x.reverse(), data: y.reverse() });
		});
	});
}

function findDay(collection, field) {
	return new Promise((resolve, reject) => {
		collection.find().where('time').gte(date2.getToday()).
			lt(date2.getTomorrow()).exec((err, data) => {
				resolve(getDataSet(data, field));
		});
	});
}

function getDataSet(data, field) {
	var temp = [];
	data.forEach((a) => {
		var idx = getTimeIndex(a.time);
		if(temp[idx] == undefined) temp[idx] = [];
		temp[idx].push(a[field]);
	});

	for(let i=0; i<temp.length; i++) if(temp[i] == undefined) temp[i] = [0];

	const y = temp.map((a, idx) => { return getAverage(a); });
	const x = y.map((a, idx) => {
		var hh = Math.floor((idx*10) /60);
		var mm = (idx*10) %60;
		return [(hh>9) ? '':'0', hh, ':', (mm>9) ? '':'0', mm].join('');
	});

	return { labels: x, data: y };
}

function getAverage(x) {
	return x.reduce((a, b) => { return a+b; }) /x.length;
}

function getTimeIndex(x) {
	var dt = (x-date2.getToday()) /60000;
	return Math.round(dt /10);
}

module.exports.findDay = findDay; 
module.exports.findRecentData = findRecentData;
