import * as d3 from 'd3';

d3.selectAll("p").style("color", function(){
    return `hsl(${Math.random()*360}, 100%, 50%)`;
});

d3.select('body').style("background-color", "#eee");

d3.selectAll('p').style( "color", ( d, i)=>{
    console.log(d, i);
})

d3.selectAll('p')
    .data([4, 8, 2])
    .style( "font-size", d =>{
        console.log(d, 'data');
    })