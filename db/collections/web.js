const mongoose = require('mongoose');
const web = new mongoose.Schema({
	time: Date,
	solar: Number,
	energy: Number,
});

const Web = mongoose.model('web', web);
const insert = (x) => {
	if(isNaN(x.solar)) x.solar = 0;
	if(isNaN(x.energy)) x.energy = 0;
	new Web({ time: new Date(), solar: x.solar, energy: x.energy }).save();
};

module.exports = Web;
module.exports.insert = insert;
