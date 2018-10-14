var color = Chart.helpers.color;

var config = {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Pi',
			backgroundColor: color(window.chartColors.red).alpha(0.3).rgbString(),
			borderColor: window.chartColors.red,
			fill: false,
			data: [],
		}, {
			label: 'Web',
			backgroundColor: color(window.chartColors.blue).alpha(0.3).rgbString(),
			borderColor: window.chartColors.blue,
			fill: false,
			data: [],
		}, {
			label: 'LoRa',
			backgroundColor: color(window.chartColors.purple).alpha(0.3).rgbString(),
			borderColor: window.chartColors.purple,
			fill: false,
			data: [],
		}],
		options: {
			responsive: true,
			tooltips: {
				mode: 'index',
			}
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('canvas_solar').getContext('2d');
	window.figure1 = new Chart(ctx, config);
	ctx = document.getElementById('canvas_energy').getContext('2d');
	window.figure2 = new Chart(ctx, config);

	window.figure1.options.title.display = true;
	window.figure1.options.title.text = 'Solar Radiation';
	window.figure2.options.title.display = true;
	window.figure2.options.title.text = 'Energy';
};
