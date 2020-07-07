// to load correctly from local, first run:
// cd C:\Users\Family\Documents\GitHub\whats4breakfast.github.io
// then run:
// npx http-server
// from anaconda cmd prompt
d3.csv('../data/lc_mod.csv')
.then(makeChart);

function makeChart(lc_data) {
  var entryDate = lc_data.map(function(d) {return d.date});
  var wordCount = lc_data.map(function(d) {return d.lewis_word_count});
  var season = lc_data.map(function(d) {return d.season;});
  var chart = new Chart('chart', {
    type: 'horizontalBar',
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