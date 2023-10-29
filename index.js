const svg = d3.select("svg");

//remove

let id = 100;

//remove

let svgWidth = document.querySelector("svg").clientWidth;
let svgHeight = document.querySelector("svg").clientHeight;
console.log(svgWidth, svgHeight);

var nodes = [
  { text: "A", id: 1, x: 100, y: 100, r: 100, c: "red" },
  { text: "B", id: 2, x: 200, y: 200, r: 50, c: "green" },
  { text: "C", id: 3, x: 300, y: 300, r: 30, c: "blue" },
  { text: "D", id: 4, x: 400, y: 400, r: 100, c: "purple" },
  { text: "E", id: 5, x: 500, y: 500, r: 50, c: "orange" },
  { text: "F", id: 6, x: 600, y: 600, r: 30, c: "pink" },
  { text: "G", id: 7, x: 700, y: 700, r: 100, c: "cyan" },
  { text: "H", id: 8, x: 800, y: 800, r: 50, c: "yellow" },
  { text: "I", id: 9, x: 900, y: 900, r: 30, c: "magenta" },
  { text: "J", id: 10, x: 100, y: 900, r: 100, c: "indigo" },
  { text: "K", id: 11, x: 200, y: 800, r: 50, c: "teal" },
  { text: "L", id: 12, x: 300, y: 700, r: 30, c: "brown" },
  { text: "M", id: 13, x: 400, y: 600, r: 100, c: "violet" },
  { text: "N", id: 14, x: 500, y: 500, r: 50, c: "grey" },
  { text: "O", id: 15, x: 600, y: 400, r: 30, c: "black" },
  { text: "P", id: 16, x: 700, y: 300, r: 100, c: "white" },
  { text: "Q", id: 17, x: 800, y: 200, r: 50, c: "olive" },
  { text: "R", id: 18, x: 900, y: 100, r: 30, c: "cyan" },
  { text: "S", id: 19, x: 100, y: 100, r: 100, c: "pink" },
  { text: "T", id: 20, x: 200, y: 200, r: 50, c: "orange" },
  { text: "U", id: 21, x: 300, y: 300, r: 30, c: "blue" },
  { text: "V", id: 22, x: 400, y: 400, r: 100, c: "red" },
  { text: "W", id: 23, x: 500, y: 500, r: 50, c: "green" },
  { text: "X", id: 24, x: 600, y: 600, r: 30, c: "yellow" },
  { text: "Y", id: 25, x: 700, y: 700, r: 100, c: "magenta" },
  { text: "Z", id: 26, x: 800, y: 800, r: 50, c: "cyan" },
  { text: "AA", id: 27, x: 900, y: 900, r: 30, c: "teal" },
  { text: "AB", id: 28, x: 100, y: 900, r: 100, c: "brown" },
  { text: "AC", id: 29, x: 200, y: 800, r: 50, c: "violet" },
  { text: "AD", id: 30, x: 300, y: 700, r: 30, c: "indigo" },
];

var node = svg.selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("id", d => d.id)
  .attr("transform", d => `translate(${d.x}, ${d.y})`)

let circles = node.append("circle")
  .attr("r", d => d.r)
  .attr("fill", d => d.c || "grey")
  .attr("stroke", "black")

let text = node.append("text")
  .text(d => d.text)
  .attr("text-anchor", "middle")
  .attr("dy", ".35em");

let simulation = d3.forceSimulation(nodes)
    .force("x", d3.forceX(0).strength(0.05)) 
    .force("y", d3.forceY(0).strength(0.05))
    .force("center", d3.forceCenter(700, 400))
    .force("collide", d3.forceCollide(d => d.r + 5).strength(0.8))

simulation.on("tick", () => {
  node.attr("transform", d => {
    return `translate(${d.x}, ${d.y})`})
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
  d.fx = event.x;
  d.fy = event.y;
} 
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function attachHoverListeners(elm){

  let hoverElemOrigRad = 0;

  elm.on("mouseenter", (event, d) => {
    event.stopPropagation();
    hoverElemOrigRad = d.r;
    if (d.r !== 100){
      d.r = 100;
      elm.raise();
      elm.select("circle").transition().duration(500).attr("r", d.r);
      setTimeout(() => {
        simulation.force("collide", d3.forceCollide(d => d.r + 5).strength(0.5));
        simulation.alpha(0.1).restart();
      }, 250);
    }
  });

  elm.on("mouseleave", (event, d) => {
    event.stopPropagation();
    if (hoverElemOrigRad !== 100){
      d.r = hoverElemOrigRad;
      elm.select("circle").transition().duration(500).attr("r", d.r);
      setTimeout(() => {
        simulation.force("collide", d3.forceCollide(d => d.r + 5).strength(0.8));
        simulation.alpha(0.1).restart();
      }, 500);
    }
  });

}
function attachPopListener(){
  d3.select(this).remove();
  nodes.splice(nodes.findIndex(node => node.id == this.attributes.id.value), 1);
  node = svg.selectAll(".node");
  simulation.alpha(0.25).restart();
}

svg.selectAll(".node").each(function(d){
  attachHoverListeners(d3.select(this));
  this.addEventListener("dblclick", attachPopListener);
});

document.getElementById("addBtn").addEventListener("click", () => {
    let temp = id++;
    let newData = {id: temp, text:"new", x: 0, y: 0, r: 50, c: "orange"};
    nodes.push(newData);
    let newNode = svg.append("g")
                  .data([newData])
                  .attr("class", "node")
                  .attr("id", temp)
                  .attr("transform", d => `translate(${d.x}, ${d.y})`);
    newNode.append("circle")
          .attr("r", d => d.r)
          .attr("fill", d => d.c || "grey")
          .attr("stroke", "black");
    newNode.append("text")
          .text(d => d.text)
          .attr("text-anchor", "middle")
          .attr("dy", ".35em");

    attachHoverListeners(newNode);
    newNode.node().addEventListener("dblclick", attachPopListener);
    
    simulation.nodes(nodes);
    
    newNode.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node = svg.selectAll(".node");
    simulation.alpha(0.25).restart();

});


