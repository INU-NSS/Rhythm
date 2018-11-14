var color = Chart.helpers.color;

var config = {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Solar irradiance [W/m²]',
			backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
			borderColor: window.chartColors.red,
			data: [],
		}],
		options: {
			responsive: true,
			tooltips: {
				mode: 'index',
				intersect: false
			}
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
	window.plot = new Chart(ctx, config);
};
