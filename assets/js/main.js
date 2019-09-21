/*---------------------------------------------------*
 * Coffe shop annual data visualization 
 *---------------------------------------------------*/
const margin = { top: 30, right: 20, bottom:80, left: 80 };

const width = 760 - (margin.right + margin.left);
const height = 500 - (margin.top + margin.bottom);

const svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.json("data/data.json")
  .then( responseData =>{
    const data = responseData.map( obj => ({...obj, profit: +obj.profit, revenue: +obj.revenue}));
    const profit = data.map( d => d.profit );
    const revenue = data.map( d=> d.revenue);
    const months = data.map( d => d.month);

    const x = d3.scaleBand()
      .domain(months)
      .range([0, width])
      .paddingInner([0.3])
      .paddingOuter([0.3]);

    const y = d3.scaleLinear()
      .domain([0, d3.max( revenue)])
      .range([height, 0]);

    console.log(d3.max(revenue), "max revenue");
    /* Axis generator */
    const xAxisCall = d3.axisBottom(x);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxisCall);

    const yAxisCall = d3.axisLeft(y)
    svg.append("g")
      .call(yAxisCall)


    /* Adding Labels */
    svg.append("text")
      .attr("class", "x axislabel")
      .attr("x", width /2)
      .attr("y", height + 50)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Months");

    svg.append("text")
      .attr("class", "y axislabel")
      .attr("x", height/2)
      .attr("y", 70)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-270)")
      .text("Revenue");
      // .attr("transform", "rotate()")

      
    /* Rect generator */
    const rects = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
        .attr("y", d => y(d.revenue))
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.revenue))
        .attr("fill", "teal");
    
  })
  .catch( error =>{
    console.log(error, "got error while fetching data.json file");
  })