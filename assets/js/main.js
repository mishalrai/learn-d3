/*----------------------------------------* 
 * LOADING DATA (.CSV .TSV .JSON) 
 *----------------------------------------*/  
/* Selector */
const svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400);

d3.json("data/ages.json")
  .then( resData =>{
    const data = resData.map( obj => ({...obj, age:+obj.age}));

    const circles = svg.selectAll("circle")
      .data(data)

    circles.enter()
      .append("circle")
        .attr("cx", function( d, i){
          return (i*50)+25;
        })
        .attr("cy", 25)
        .attr("r", function(d, i){
          return d.age * 2;
        })
        .attr("fill", d=> "Richar" === d.name ?"blue":"red" );

  })
  .catch( err =>{
    console.log(err);
  })
