  
  // let links = [];
  // for (let i = 0; i < nodes.length - 1; i++) {
  //   links.push({ source: i, target: (i + 1) });
  // }
  // const links = [
  //   { source: 0, target: 1 }, 
  //   { source: 1, target: 2 },
  //   { source: 2, target: 3 },
  //   { source: 3, target: 4 },
  // ];


    // link
  //   .attr("x1", d => d.source.x)
  //   .attr("y1", d => d.source.y)
  //   .attr("x2", d => d.target.x)
  //   .attr("y2", d => d.target.y);

// Create link elements
// const link = svg.selectAll(".link")
//   .data(links)
//   .enter().append("line")
//   .attr("class", "link")
//   .attr("stroke-width", 2)
//   .attr("stroke", "black");

// .force("link", d3.forceLink(links).distance(50))

let state = "attract";
if (state === "attract"){
  simulation.force("x", null);
  simulation.force("y", null);
  simulation.force("radial", d3.forceRadial(300, 700, 400));
  simulation.alpha(0.5).restart();
  state = "radial";
}else{
  simulation.force("x", d3.forceX(0).strength(0.05));
  simulation.force("y", d3.forceY(0).strength(0.05));
  simulation.force("radial", null);
  simulation.alpha(0.5).restart();
  state = "attract";
}