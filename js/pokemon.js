d3.csv("../data/pkmn.csv").then(typeCount);
d3.csv("../data/pkmn.csv").then(typeAvgStats);
d3.csv("../data/pkmn.csv").then(typeGenCapRate);

// bar chart

function typeCount(pkmn){
	
	var typ = new Array(pkmn.map(function (d) {return d.type1}), pkmn.map(function (d) {return d.type2}));

	var ct = {};

	for (var j = 0; j < typ.length; j++) {
		for (var i = 0; i < typ[j].length; i++) {
			ct[typ[j][i]] = 1 + (ct[typ[j][i]] || 0);
		}
	}

	delete ct[''];

	ctSortVals = Object.keys(ct).sort(function(a,b){return ct[b]-ct[a]}).map(key => ct[key]);
	ctSortLabels = Object.keys(ct).sort(function(a,b){return ct[b]-ct[a]});

	var typeChart = new Chart('chart', {
		type: 'bar',
		data: {
			labels: ctSortLabels,
			datasets: [
			{
				data: ctSortVals,
				backgroundColor: '#b3ffff'
			}]
		},
		options: {
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
}

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

	function typeGenCapRate(pkmn) {

		var cap = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
		var count = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

		pkmn.forEach(e => {
			if(e.is_legendary==0){
				if(e.generation==1){
					cap[0][0] += Number(e.capture_rate);
					count[0][0] ++;
				} else if (e.generation==2) {
					cap[0][1] += Number(e.capture_rate);
					count[0][1] ++;
				} else if (e.generation==3) {
					cap[0][2] += Number(e.capture_rate);
					count[0][2] ++;
				} else if (e.generation==4) {
					cap[0][3] += Number(e.capture_rate);
					count[0][3] ++;
				} else if (e.generation==5) {
					cap[0][4] += Number(e.capture_rate);
					count[0][4] ++;
				} else if (e.generation==6) {
					cap[0][5] += Number(e.capture_rate);
					count[0][5] ++;
				} else if(e.generation==7) {
					cap[0][6] += Number(e.capture_rate);
					count[0][6] ++;
				} else;
			} else if (e.is_legendary==1){
				if(e.generation==1){
					cap[1][0] += Number(e.capture_rate);
					count[1][0] ++;
				} else if (e.generation==2) {
					cap[1][1] += Number(e.capture_rate);
					count[1][1] ++;
				} else if (e.generation==3) {
					cap[1][2] += Number(e.capture_rate);
					count[1][2] ++;
				} else if (e.generation==4) {
					cap[1][3] += Number(e.capture_rate);
					count[1][3] ++;
				} else if (e.generation==5) {
					cap[1][4] += Number(e.capture_rate);
					count[1][4] ++;
				} else if (e.generation==6) {
					cap[1][5] += Number(e.capture_rate);
					count[1][5] ++;
				} else if(e.generation==7) {
					cap[1][6] += Number(e.capture_rate);
					count[1][6] ++;
				} else;
			} else;
		});

		var capGen = [cap[0].map(function(n,i){return n/count[0][i];}),cap[1].map(function(n,i){return n/count[1][i];})]

		console.log(capGen);

		var avgStatsChart = new Chart('bart', {
			type: 'line',
			data: {
				labels: ['Gen 1', 'Gen 2', 'Gen 3', 'Gen 4','Gen 5','Gen 6','Gen 7'],
				datasets: [{
					label: 'Non-Legendary',
					borderColor: 'rgba(255, 99, 99)',
					backgroundColor: 'rgba(0, 0, 0, 0)',
					data: capGen[0]
				},
				{
					label: 'Legendary',
					borderColor: 'rgba(60, 179, 113)',
					backgroundColor: 'rgba(0, 0, 0, 0)',
					data: capGen[1]
				}]
			},
			options: {
				maintainAspectRatio:false
				
			}

		});
	}