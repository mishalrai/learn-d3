import * as d3 from 'd3';

d3.selectAll("p").transition()
    .duration(1000)    
    .delay( (d, i)=> i*1000)
    .style("color", () =>`hsl(${Math.random()*360}, 100%, 50%)`)
    .attr("r", 'data');
/* 
d3.select('body').style("background-color", "#eee");

d3.selectAll('p')
    .data([20, 28, 30])
    .style( "font-size", d => `${d}px`);

d3.select('body')
    .selectAll('p')
    .data([20, 40, 50, 80, 90, 100])
    .enter()
    .append('p')
    .text( d => `new DOM node ${d}`)
    .style("font-size", d=>`${d}px`); */



/*----------------------------------------*
 *  Update
 *----------------------------------------*/

/*  const p = d3.select('body')
                .selectAll('p')
                .data([10, 20, 30, 40, 50, 60])
                .text( d=> `Node number ${d}`);

            p.enter().append('p')
                .text( d => `new element ${d}`);
            
            p.exit().remove(); */
