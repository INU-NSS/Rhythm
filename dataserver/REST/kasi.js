/* 
 * 2018.10.06
 * [reference](https://mykzilla.org/2017/08/30/headless-firefox-in-node-js-with-selenium-webdriver/)
 * 
 */

const {Builder, By, Key, promise, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
promise.USE_PROMISE_MANAGER = false;	 // to use native async/await
var options = new firefox.Options();
options.addArguments('--headless');

async function update() {
	let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
	let altitude;
	try {
		let query = createQuery();
		await driver.get(query);
		let table = await driver.findElement(By.id('sun-height-table'));
		let td = await table.findElements(By.tagName('td'));
		altitude = await td[1].getText();
	}	finally {
		await driver.quit();
		return Promise.resolve(altitude);
	}
}

/* convert a value to 2 digit */
function c2d(t) {
	return [(t>9 ? '':'0'), t].join('');
}

function createQuery() {
	var date = new Date();
	var m = c2d(date.getMonth() + 1);
	var d = c2d(date.getDate());

	var p = {
		date: [date.getFullYear(), '-', m, '-', d].join(''),
		hour: c2d(date.getHours()),
		minute: c2d(date.getMinutes()),
		second: c2d(date.getSeconds())
	};

	var url = 'https://astro.kasi.re.kr:444/life/pageView/10';
	var params = `?useElevation=1&output_range=2&date=${p.date}&hour=${p.hour}&minute=${p.minute}&second=${p.second}&address=seoul`;
	return [url, params].join('');
}

module.exports.update = update; 
