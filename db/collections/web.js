const mongoose = require('mongoose');
const web = new mongoose.Schema({
	time: Date,
	solar: Number,
	energy: Number,
});

const Web = mongoose.model('web', web);
const insert = (x) => new Web({ time: new Date(), solar: x.solar, energy: x.energy }).save();

module.exports = Web;
module.exports.insert = insert;
