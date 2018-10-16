const request = require('request');

function update(callback) {
	var date = new Date().getToday();
	date = '20180927';

	const key = '1%2B3oRBiymPLtzGGcI115AWcHDJF8wPyYq%2FlpP5pM0z80nBhxblstcxW4LBjomJqdDlycAd5QutcOTiKGfIE0aQ%3D%3D';
	var query = `http://apis.data.go.kr/B090041/openapi/service/SrAltudeInfoService/getLCSrAltudeInfo?locdate=${date}&latitude=3500&longitude=00000&ServiceKey=${key}&_type=json`;

	return new Promise((resolve, reject) => {
		request(query, (err, res, body) => {
			if(err) reject('error', err);

			var data = JSON.parse(body);
			resolve(data.response.body.items.item);
		});
	});
}

Date.prototype.getToday = function() {
	var mm = this.getMonth() + 1;
	var dd = this.getDate();

	return [this.getFullYear(), (mm>9 ? '':'0') + mm, (dd>9 ? '':'0') + dd].join('');
};

function getAltitudeIndex() {
	var hh = new Date().getHours();
	if(hh < 9 || hh > 18) return -1;

	var idx = Math.floor(hh/4) - 2;
	return idx;
}

function deg2rad(degrees) {
	var x = parseFloat(degrees.replace('˚', '.').replace(' ', ''));
	return x * (Math.PI/180);
}

module.exports = {
	update: update,
	getAltitudeIndex: getAltitudeIndex,
	deg2rad: deg2rad
};
