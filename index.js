const svg = d3.select("svg");

let svgWidth = document.querySelector("svg").clientWidth;
let svgHeight = document.querySelector("svg").clientHeight;
console.log(svgWidth, svgHeight);

let nodes = [
  { id: "A", x: 100, y: 100, r: 100, c: "red" },
  { id: "B", x: 200, y: 200, r: 50, c: "green" },
  { id: "C", x: 300, y: 300, r: 30, c: "blue" },
  { id: "D", x: 400, y: 400, r: 100, c: "purple" },
  { id: "E", x: 500, y: 500, r: 50, c: "orange" },
  { id: "F", x: 600, y: 600, r: 30, c: "pink" },
  { id: "G", x: 700, y: 700, r: 100, c: "cyan" },
  { id: "H", x: 800, y: 800, r: 50, c: "yellow" },
  { id: "I", x: 900, y: 900, r: 30, c: "magenta" },
  { id: "J", x: 100, y: 900, r: 100, c: "indigo" },
  { id: "K", x: 200, y: 800, r: 50, c: "teal" },
  { id: "L", x: 300, y: 700, r: 30, c: "brown" },
  { id: "M", x: 400, y: 600, r: 100, c: "violet" },
  { id: "N", x: 500, y: 500, r: 50, c: "grey" },
  { id: "O", x: 600, y: 400, r: 30, c: "black" },
  { id: "P", x: 700, y: 300, r: 100, c: "white" },
  { id: "Q", x: 800, y: 200, r: 50, c: "olive" },
  { id: "R", x: 900, y: 100, r: 30, c: "cyan" },
  { id: "S", x: 100, y: 100, r: 100, c: "pink" },
  { id: "T", x: 200, y: 200, r: 50, c: "orange" },
  { id: "U", x: 300, y: 300, r: 30, c: "blue" },
  { id: "V", x: 400, y: 400, r: 100, c: "red" },
  { id: "W", x: 500, y: 500, r: 50, c: "green" },
  { id: "X", x: 600, y: 600, r: 30, c: "yellow" },
  { id: "Y", x: 700, y: 700, r: 100, c: "magenta" },
  { id: "Z", x: 800, y: 800, r: 50, c: "cyan" },
  { id: "AA", x: 900, y: 900, r: 30, c: "teal" },
  { id: "AB", x: 100, y: 900, r: 100, c: "brown" },
  { id: "AC", x: 200, y: 800, r: 50, c: "violet" },
  { id: "AD", x: 300, y: 700, r: 30, c: "indigo" },
];

let node = svg.selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("transform", d => `translate(${d.x}, ${d.y})`)

let circles = node.append("circle")
  .attr("r", d => d.r)
  .attr("fill", d => d.c || "grey")
  .attr("stroke", "black")

let text = node.append("text")
  .text(d => d.id)
  .attr("text-anchor", "middle")
  .attr("dy", ".35em");

let simulation = d3.forceSimulation(nodes)
    .force("x", d3.forceX(0).strength(0.05)) 
    .force("y", d3.forceY(0).strength(0.05))
    .force("center", d3.forceCenter(700, 400))
    .force("collide", d3.forceCollide(d => d.r + 5).strength(0.8))

simulation.on("tick", () => {
  node.attr("transform", d => `translate(${d.x}, ${d.y})`)
  if (simulation.alpha() < 0.001) {
    simulation.stop();
  }
});

node.call(d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended));

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = Math.max(50, Math.min(svgWidth - 50, event.x));
  d.fy = Math.max(50, Math.min(svgHeight - 50, event.y));
} 
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

console.log(node);
let hoverElemOrigRad = 0;

svg.selectAll(".node").each(function(d, i) {
  const gElement = d3.select(this);

  gElement.on("mouseenter", (event, d) => {
    event.stopPropagation();
    hoverElemOrigRad = d.r;
    if (d.r !== 100){
      d.r = 100;
      gElement.raise();
      gElement.select("circle").transition().duration(500).attr("r", d.r);
      setTimeout(() => {
        simulation.force("collide", d3.forceCollide(d => d.r + 5).strength(0.5));
        simulation.alpha(0.1).restart();
      }, 250);
    }
  });
  
  gElement.on("mouseleave", (event, d) => {
    event.stopPropagation();
    if (hoverElemOrigRad !== 100){
      d.r = hoverElemOrigRad;
      gElement.select("circle").transition().duration(500).attr("r", d.r);
      setTimeout(() => {
        simulation.force("collide", d3.forceCollide(d => d.r + 5).strength(0.8));
        simulation.alpha(0.1).restart();
      }, 500);
    }
  });

});

let state = "attract";
$("button").on("click", () => {
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
    nodes.push({id: "New", x: 0, y: 0, r: 50, c: "orange"});
    console.log(nodes);
    let newNode = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .append("circle")
        .attr("r", d => d.r)
        .attr("fill", d => d.c || "grey")
        .append("text")
        .text(d => d.id)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em");
      
      node = node.merge(newNode);
      simulation = simulation.nodes(node)
      simulation.alpha(0.2).restart();
});