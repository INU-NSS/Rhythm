const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.7/test', { useNewUrlParser: true });

const schema = mongoose.Schema({
	date: String,
	time: [Number],
	ir2: {
		pi: [Number],
		lora: [Number],
		kma: [Number],
	}
});

const IR2 = mongoose.model('ir2', schema);

const findy = (callback) => {
	IR2.find().select('-_id -__v').exec((err, data) => {
		//console.log(data);
		callback(data);
	});
};


module.exports = IR2;
module.exports.findy = findy;
