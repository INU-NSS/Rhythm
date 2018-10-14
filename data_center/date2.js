function getToday() {
	return new Date(new Date().toISOString().slice(0, 10));
}

function getTomorrow() {
	var t = getToday();
	return new Date(t.setDate(t.getDate() +1));
}

module.exports.getToday = getToday;
module.exports.getTomorrow = getTomorrow;
