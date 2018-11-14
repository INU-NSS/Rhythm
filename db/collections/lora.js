const mongoose = require('mongoose');

const lora = new mongoose.Schema({
	time: Date,
	solar: Number,
	sh : Number,
	energy: Number,
	temp: Number,
});

const Lora = mongoose.model('lora', lora);
const insert = (x) => new Lora({ time: new Date(), solar: x.solar, sh: x.sh, energy: x.energy, temp: x.temp }).save();


module.exports = Lora;
module.exports.insert = insert;
