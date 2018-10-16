const today = () => {
	let date = new Date(new Date().toISOString().slice(0, 10));
	return new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
};

const tomorrow = () => {
	let date = today();
	return new Date(date.setDate(date.getDate() +1));
};

module.exports = {
	today: today,
	tomorrow: tomorrow
};
