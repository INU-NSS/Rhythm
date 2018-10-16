const mongoose = require('mongoose');

const schema = mongoose.Schema({
	time: Date,
	energy: Number,
	sv: Number,
	sh: Number
});

const Pi = mongoose.model('pi', schema);
const insert = (x) =>  new Pi({ time: new Date(), energy: x.energy, sv: x.sv, sh: x.sh }).save();

module.exports = Pi;
module.exports.insert = insert;
