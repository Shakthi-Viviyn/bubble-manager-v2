const svg = d3.select("svg");

// Define your nodes and links
const nodes = [
    { id: "A", x: 100, y: 100, r: 50 },
    { id: "B", x: 200, y: 200, r: 30 },
    { id: "C", x: 300, y: 300, r: 10 },
    { id: "D", x: 150, y: 250, r: 50 },
    { id: "E", x: 250, y: 150, r: 30 },
    { id: "F", x: 350, y: 350, r: 10 },
    { id: "G", x: 50, y: 50, r: 50 },
    { id: "H", x: 400, y: 100, r: 30 },
    { id: "I", x: 100, y: 400, r: 10 },
    { id: "J", x: 450, y: 450, r: 10 },
    { id: "K", x: 600, y: 200, r: 50 },
    { id: "L", x: 700, y: 300, r: 30 },
    { id: "M", x: 800, y: 100, r: 50 },
    { id: "N", x: 550, y: 250, r: 10 },
    { id: "O", x: 650, y: 150, r: 50 },
    { id: "P", x: 750, y: 350, r: 30 },
    { id: "Q", x: 700, y: 450, r: 10 },
    { id: "R", x: 900, y: 50, r: 50 },
    { id: "S", x: 950, y: 400, r: 30 },
    { id: "T", x: 800, y: 400, r: 10 },
    { id: "U", x: 750, y: 200, r: 50 },
    { id: "V", x: 900, y: 300, r: 10 },
    { id: "W", x: 200, y: 50, r: 50 },
    { id: "X", x: 100, y: 350, r: 30 },
    { id: "Y", x: 300, y: 600, r: 50 },
    { id: "Z", x: 500, y: 550, r: 30 },
    { id: "AA", x: 650, y: 450, r: 10 },
    { id: "AB", x: 450, y: 150, r: 50 },
    { id: "AC", x: 550, y: 350, r: 30 },
    { id: "AD", x: 750, y: 550, r: 10 },
  ];
  
  const links = [
    { source: 0, target: 1 }, 
    // { source: 1, target: 2 },
    // { source: 2, target: 0 },
  ];

// Create node elements
const node = svg.selectAll(".node")
  .data(nodes)
  .enter().append("circle")
  .attr("class", "node")
  .attr("r", d => d.r);


// Create a simulation with forces
const simulation = d3.forceSimulation(nodes)
//   .force("link", d3.forceLink(links).distance(150))
//   .force("charge", d3.forceManyBody().strength(100))
//   .force("center", d3.forceCenter(400, 300));
    .force("x", d3.forceX(700)) 
    .force("y", d3.forceY(400))
    // .force("radial", d3.forceRadial(240, 500, 400))
    .force("collide", d3.forceCollide(d => d.r + 5))

// Create link elements
const link = svg.selectAll(".link")
  .data(links)
  .enter().append("line")
  .attr("class", "link")
  .attr("stroke-width", 2);

// Add drag behavior to nodes
// Update positions of nodes and links
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
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

let state = "attract";

document.querySelector("button").addEventListener("click", () => {
    if (state === "attract"){
        simulation.force("x", null);
        simulation.force("y", null);
        simulation.force("radial", d3.forceRadial(240, 500, 400));
        simulation.alpha(1).restart();
        state = "radial";
        console.log("radial");
    }else{
        simulation.force("x", d3.forceX(700));
        simulation.force("y", d3.forceY(400));
        simulation.force("radial", null);
        simulation.alpha(1).restart();
        state = "attract";
        console.log("attract");
        setTimeout(() => {
            simulation.alpha(1).restart();
        }, 1000);
    }
});