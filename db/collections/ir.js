const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.7/test', { useNewUrlParser: true });

const schema = mongoose.Schema({
	date: String,
	time: [Number],
	ir: {
		pi: [Number],
		lora: [Number],
		kma: [Number],
	}
});

const IR = mongoose.model('ir', schema);

const findx = (callback) => {
	IR.find().select('-_id -__v').exec((err, data) => {
		//console.log(data);
		callback(data);
	});
};


module.exports = IR;
module.exports.findx = findx;
