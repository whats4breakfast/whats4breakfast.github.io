d3.csv('atp_wta.csv')
    .then(makeChart);

    function makeChart(players) {
      var playerLabels = players.map(function(d) {return d.Name});
      var weeksData = players.map(function(d) {return d.Weeks});
      var playerColors = players.map(function(d) {return d.Gender === 'Female' ? '#F15F36' : '#19A0AA';});
      var chart = new Chart('chart', {
        type: 'horizontalBar',
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Weeks at No.1',
                fontSize: 16
              }
            }
            ]
          }
        },
        data: {
          labels: playerLabels,
          datasets: [
          {
            data: weeksData,
            backgroundColor: playerColors
          }
          ]
        }
      });
    }