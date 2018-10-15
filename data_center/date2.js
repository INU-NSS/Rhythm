function getToday() {
	var date = new Date(new Date().toISOString().slice(0, 10));
	date = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
	return date;
}

function getTomorrow() {
	var t = getToday();
	return new Date(t.setDate(t.getDate() +1));
}

module.exports.getToday = getToday;
module.exports.getTomorrow = getTomorrow;
