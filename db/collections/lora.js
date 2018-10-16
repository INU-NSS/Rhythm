const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lora = new Schema({
	time: Date,
	solar: Number,
	energy: Number,
	temp: Number,
});

const Lora = mongoose.model('lora', lora);
const insert = (x) => new Lora({ time: new Date(), solar: x.solar, energy: x.energy, temp: x.temp }).save();

module.exports = Lora;
module.exports.insert = insert;
