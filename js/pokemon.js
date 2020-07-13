d3.csv('../data/types.csv').then(makeChart);

function makeChart(types){
	var typeLabels = types.map(function(d) {return d.type});
	var countData = types.map(function(d) {return d.count});
	var options = {
		maintainAspectRatio:false,
		responsive: true,
		legend: {
			display:false
		},
		scales: {
			xAxes: [{
				gridLines: {
					display:false
				}
			}]
		}
	}
	var typeChart = new Chart('chart', {
		type: 'bar',
		data: {
			labels: typeLabels,
			datasets: [
			{
				data: countData,
				backgroundColor: '#b3ffff'
			}]
		},
		options: options
	});
}

var baseStatsChart = new Chart('shart', {
	type: 'radar',
	data: {
		labels: ['HP', 'Attack', 'Defense', 'Sp. Attack','Sp. Defense','Speed'],
		datasets: [{
			data: [63.3, 73.5, 69.4, 67.4, 66.5, 69.0]
		}]
	},
	options: {
		maintainAspectRatio:false,
		responsive: true,
		elements: {
			line: {
				backgroundColor: 'rgba(147, 18, 175, 0.2)',
				borderColor: 'rgba(147, 18, 175, 1)',
			}
		},
		legend: {
			display:false
		},
		scale: {
			angleLines: {
				display: true
			},
			ticks: {
				suggestedMin: 0,
				suggestedMax: 90
			}
		}
	}
});

function generateData(x) {
	console.log(x);
	if(x == 1) {
		return [63.3, 73.5, 69.4, 67.4, 66.5, 69.0];
	} else if (x == 2) {
		return [71, 70, 71.8, 65.4, 73.4, 61.6];
	} else if (x == 3) {
		return [65.7, 77.2, 72.6, 71.6, 69.4, 63.6];
	} else if (x == 4) {
		return [73.1, 82.7, 76.2, 74.6, 74.5, 70.1];
	} else if (x == 5) {
		return [70.3, 80.6, 72.0, 70.0, 67.7, 66.5];
	} else if (x == 6) {
		return [71.1, 76.5, 73.6, 76.6, 73.2, 66.7];
	} else {
		return [70.6, 84.6, 78, 75.3, 75.7, 64];
	}
}

document.getElementById('gen').addEventListener('click',
	function() {
		baseStatsChart.data.datasets.forEach(function(dataset) {
			dataset.data = generateData(gen.value);
		});
		baseStatsChart.update();
	})
