const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.7/test', { useNewUrlParser: true });

const schema = mongoose.Schema({
	date: String,
	time: [Number],
	ir3: {
		pi: [Number],
		lora: [Number],
		kma: [Number],
	}
});

const IR3 = mongoose.model('ir3', schema);

const findz = (callback) => {
	IR3.find().select('-_id -__v').exec((err, data) => {
		//console.log(data);
		callback(data);
	});
};


module.exports = IR3;
module.exports.findz = findz;
