d3.csv("../data/pkmn.csv").then(typeAvgStats);

// bar chart
/*
function typeCount(pk){
	
	const distinct = (value, index, self) => {
		return self.indexOf(value) === index;
	}

	var types1 = pk.map(function (d) {return d.type1});

	console.log(types1.filter(distinct));


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
		options = {
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
	});
}*/

function typeAvgStats(pkmn) {

	var typ = new Array(pkmn.map(function (d) {return d.type1}), pkmn.map(function (d) {return d.type2}));

	function getAllIndexes(arr, val) {
		var indexes = [], i = -1;
		while ((i = arr.indexOf(val, i+1)) != -1){
			indexes.push(i);
		}
		return indexes;
	}

	function getAvgStats(my_type) {

		var idx = getAllIndexes(typ["0"], my_type).concat(getAllIndexes(typ["1"], my_type));
		var [a,b,c,d,f,g] = [0,0,0,0,0,0];

		hp = pkmn.map(function (d) {return d.hp});
		atk = pkmn.map(function (d) {return d.attack});
		def = pkmn.map(function (d) {return d.defense});
		spa = pkmn.map(function (d) {return d.sp_attack});
		spd = pkmn.map(function (d) {return d.sp_defense});
		spe = pkmn.map(function (d) {return d.speed});

		idx.forEach(e => {
			a += Number(hp[e]);
			b += Number(atk[e]);
			c += Number(def[e]);
			d += Number(spa[e]);
			f += Number(spd[e]);
			g += Number(spe[e]);
		});

		return [Math.round(a/idx.length),
		Math.round(b/idx.length),
		Math.round(c/idx.length),
		Math.round(d/idx.length),
		Math.round(f/idx.length),
		Math.round(g/idx.length)];

	}

	var avgStatsChart = new Chart('thart', {
		type: 'radar',
		data: {
			labels: ['HP', 'Attack', 'Defense', 'Sp. Attack','Sp. Defense','Speed'],
			datasets: [{
				data: getAvgStats('bug')
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
					suggestedMax: 120
				}
			}
		}
	});

	document.getElementById('type').addEventListener('click',
		function() {
			avgStatsChart.data.datasets.forEach(function(dataset) {
				dataset.data = getAvgStats(type.value);
			});
			avgStatsChart.update();
		}
		)}