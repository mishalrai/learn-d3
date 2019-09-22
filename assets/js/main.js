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

const x = d3.scaleBand()
  .range([0, width])
  .paddingInner([0.3])
  .paddingOuter([0.3]);

const y = d3.scaleLinear()
  .range([height, 0]);

/* Axis generator */
const xAxisGroup = svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  
const yAxisGroup = svg.append("g");

/* Adding Labels */
svg.append("text")
  .attr("class", "x axislabel")
  .attr("x", width /2)
  .attr("y", height + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Months");

const yLabel = svg.append("text")
  .attr("class", "y axislabel")
  .attr("x", height/2)
  .attr("y", 70)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(90)");
  

let flag = true;


d3.json("data/data.json")
  .then( responseData =>{
    const data = responseData.map( obj => ({...obj, profit: +obj.profit, revenue: +obj.revenue}));
    
    d3.interval( function(){
      flag = !flag;
      update( data );
    }, 5000);
    update(data);

  })
  .catch( error =>{
    console.log(error, "got error while fetching data.json file");
  })


  function update(data){

    const value = flag ? "revenue": "profit";

    x.domain(data.map( d=>d.month));
    y.domain([0, d3.max( data.map( d => d[value]) )]);
    
    const xAxisCall = d3.axisBottom(x);
    const yAxisCall = d3.axisLeft(y);

    xAxisGroup.call(xAxisCall);
    yAxisGroup.call(yAxisCall);

    /* Rect generator */
    /* JOIN new data with old element */
    const rects = svg.selectAll("rect")
      .data(data)
    
    /* EXIT old element not prest in new data */
    rects.exit().remove();
    
    /* UPDATE  old elements present in new data */
    rects
      .attr("y", d => {
        const rv = y(d[value]);
        return rv;
      })
      .attr("x", d => x(d.month))
      .attr("width", x.bandwidth())
      .attr("height", d =>{
        const rv =  height - y(d[value]);
        return rv;
      });

    /* ENTER new elements present in new data */
    rects.enter()
      .append("rect")
        .attr("y", d => y(d[value]))
        .attr("x", d => x(d.month))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d[value]))
        .attr("fill", "teal");

    const yLabelText = flag ? "Revenue": "Profit";
    yLabel.text(yLabelText);
  }