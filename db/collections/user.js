const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const db = mongoose.createConnection('mongodb://192.168.0.7/informations', { useNewUrlParser: true });
const schema = mongoose.Schema({
	id: { type: String, unique: true, required: true },
	passwd: { type: String, require: true }
});

const isValid = (id, pw) => {
	return new Promise((resolve, reject) => {
		db.model('User', schema).findOne({ id: id, passwd: pw }, (err, res) => {
			return err ? reject(err) : resolve(res);
		});
	});
};

module.exports = db.model('User', schema);
module.exports.isValid = isValid;
