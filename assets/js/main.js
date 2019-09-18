/*----------------------------------------* 
 * LOADING DATA (.CSV .TSV .JSON) 
 *----------------------------------------*/  
/* Selector */
const svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400);

d3.json("data/buildings.json")
  .then( resData =>{
    const data = resData.map( obj => ({...obj, height:+obj.height}));

    const x = d3.scaleBand()
        .domain( resData.map( d => d.name ))
        .range([0, 400])
        .paddingInner([0.3])
        .paddingOuter([0.3]);

    const y = d3.scaleLinear() 
        .domain( d3.extent(data, d=> d.height))
        .range([0, 400]);

    const rects = svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
            .attr("y", 0)
            .attr("x", function(d, i){
              return x(d.name); 
            })
            .attr("width", x.bandwidth)
            .attr("height", function(d){
              return y(d.height);
            })
            .attr("fill", "grey")
  })
  .catch( err =>{
    console.log(err);
  })
