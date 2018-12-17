var color = Chart.helpers.color;

function createConfig(title){
	return {
		type: 'line',
		data: {
			labels: [],
			datasets: [{
				label: 'LoRa',
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
				label: 'Pi',
				backgroundColor: color(window.chartColors.purple).alpha(0.3).rgbString(),
				borderColor: window.chartColors.purple,
				fill: false,
				data: [],
			}],
			options: {
				responsive: true,
				title: {
					display: true,
					text: title
				},
				tooltips: {
					mode: 'index',
				}
			}
		}
	};
}

window.onload = function() {
	var ctx = document.getElementById('canvas_solar').getContext('2d');
	window.figure1 = new Chart(ctx, createConfig('Solar radiation'));
	ctx = document.getElementById('canvas_energy').getContext('2d');
	window.figure2 = new Chart(ctx, createConfig('energy'));

	window.figure1.options.title.display = true;
	window.figure1.options.title.text = 'Solar irradiation[kWh/m2] (h=10min)';
	window.figure2.options.title.display = true;
	window.figure2.options.title.text = 'Power Generation[kWh] (h=10min)';
};
