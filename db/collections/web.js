const mongoose = require('mongoose');
const web = new mongoose.Schema({
	time: Date,
	solar: Number,
	solarzh: Number,
	solarfzh: Number,
	energy: Number,
});

const Web = mongoose.model('web', web);
const insert = (x) => {
	if(isNaN(x.solar)) x.solar = 0;
	if(isNaN(x.solarzh)) x.solarzh = 0;
	if(isNaN(x.energy)) x.energy = 0;
	
	new Web({ time: new Date(), solar: x.solar, solarzh: x.solarzh, solarfzh: x.solarfzh, energy: x.energy }).save();
};

module.exports = Web;
module.exports.insert = insert;
