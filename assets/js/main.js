/*---------------------------------------------------*
 * Coffe shop annual data visualization 
 *---------------------------------------------------*/
const margin = { top: 30, right: 20, bottom:20, left: 10 };

const width = 960 - (margin.right + margin.left);
const height = 500 - (margin.top + margin.bottom);

const svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json("data/data.json")
  .then( responseData =>{
    const data = responseData.map( obj => ({...obj, profit: +obj.profit, revenue: +obj.revenue}));
    const profit = data.map( obj => obj.profit );
    const revenue = data.map( obj => obj.revenue);

    const x = d3.scaleBand()
      .domain([0, width])
      .range([0, width])
      .paddingInner([0.3])
      .paddingOuter([0.4]);

    const y = d3.scaleLinear()
      .domain([0, d3.max( revenue)])
      .range([0, height]);

    console.log(data, "data from data.js file  ");  
    const rects = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
        .attr("y", d => x( d.revenue))
        .attr("x", d => y(d.month))
        .attr("width", x.bandwidth())
        .attr("height", d => d.revenue)
        .attr("fill", "streelblue");
    
  })
  .catch( error =>{
    console.log(error, "got error while fetching data.json file");
  })