/*----------------------------------------* 
 * LOADING DATA (.CSV .TSV .JSON) 
 *----------------------------------------*/  
/* Selector */
const svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400);

d3.json("data/buildings.json")
  .then( resData =>{
    const data = resData.map( obj => ({...obj, age:+obj.age}));

    const y = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, 400]);

    const rects = svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
            .attr("y", 0)
            .attr("x", function(d, i){
              return(i*60);
            })
            .attr("width", 40)
            .attr("height", function(d){
              return y(d.height);
            })
            .attr("fill", "grey")
  })
  .catch( err =>{
    console.log(err);
  })
