d3.select("#list").selectAll("li")
    .data([10, 20, 30, 25, 15])
    .text(function(d) 
     { return "This is pre-existing element and the value is " + d; })
    .enter()
    .append("li")
    .text(function(d) 
     { return "This is dynamically created element and the value is " + d; });

    function remove() {
      d3.selectAll("li")
      .data([10, 20, 30, 15])
      .exit()
      .remove()
    }