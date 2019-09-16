import * as d3 from 'd3'
const data = [100, 50, 300, 150, 250];

d3.select(".chart")
  .selectAll("div")
  .data(data)
  .enter()
  .append('div')
  .style("width", d => `${d}px`)
  .text( d=> d)


/* Scale linear */
var x = d3.scaleBand.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

console.log(x(100), 'data check');

d3.select(".scale-chart")
  .selectAll('div')
    .data(data)
  .enter().append('div')
  .style('width', d => `${x(d)}px`)
  .text( d=> d);