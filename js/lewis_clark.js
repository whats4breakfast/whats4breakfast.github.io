d3.csv('../data/lc_mod.csv')
.then(makeChart);

function makeChart(lc_data) {
  var entryDate = lc_data.map(function(d) {return d.date});
  var wordCount = lc_data.map(function(d) {return d.lewis_word_count});
  var season = lc_data.map(function(d) {return d.season;});
  var chart = new Chart('chart', {
    type: 'line',
    options: {
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Lewis Word Count',
            fontSize: 16
          }
        }]
      }
    },
    data: {
      labels: entryDate,
      datasets: [
      {
        data: wordCount,
        backgroundColor: '#19A0AA'
      }
      ]
    }
  });
}