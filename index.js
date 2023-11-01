const svg = d3.select("svg");

let svgWidth = document.querySelector("svg").clientWidth;
let svgHeight = document.querySelector("svg").clientHeight;

const currentDate = new Date();
document.getElementById("dateTask").setAttribute("min",currentDate.toISOString().slice(0,10));

var nodes = [
  { name: "aaaaaaa", id: 1, x: 100, y: 100, r: 120, color: "#DB5657", description: "This is a random description of \nlength 25", timeRequired: "12h 30m" },
  { name: "DHFJGHD", id: 2, x: 200, y: 200, r: 50, color: "#67BB6D", description: "This is a random description of length 25", timeRequired: "8h 45m" },
  { name: "JFGHDFG", id: 3, x: 300, y: 300, r: 40, color: "#3DC7C7", description: "This is a random description of length 25", timeRequired: "5h 15m" },
  { name: "KJGDFHD", id: 4, x: 400, y: 400, r: 100, color: "#D4DC6C", description: "This is a random description of length 25", timeRequired: "10h 0m" },
  { name: "DHFJGHD", id: 5, x: 500, y: 500, r: 50, color: "#9292C8", description: "This is a random description of length 25", timeRequired: "6h 30m" },
  { name: "JFGHDFG", id: 6, x: 600, y: 600, r: 40, color: "#60DAAC", description: "This is a random description of length 25", timeRequired: "3h 45m" },
  { name: "KJGDFHD", id: 7, x: 700, y: 700, r: 100, color: "#DB5657", description: "This is a random description of length 25", timeRequired: "9h 0m" },
  { name: "DHFJGHD", id: 8, x: 800, y: 800, r: 50, color: "#67BB6D", description: "This is a random description of length 25", timeRequired: "4h 15m" },
  { name: "JFGHDFG", id: 9, x: 900, y: 900, r: 40, color: "#3DC7C7", description: "This is a random description of length 25", timeRequired: "7h 30m" },
  { name: "KJGDFHD", id: 10, x: 100, y: 900, r: 100, color: "#D4DC6C", description: "This is a random description of length 25", timeRequired: "11h 15m" },
  { name: "DHFJGHD", id: 11, x: 200, y: 800, r: 50, color: "#9292C8", description: "This is a random description of length 25", timeRequired: "2h 45m" },
  { name: "JFGHDFG", id: 12, x: 300, y: 700, r: 40, color: "#60DAAC", description: "This is a random description of length 25", timeRequired: "8h 0m" },
  { name: "KJGDFHD", id: 13, x: 400, y: 600, r: 100, color: "#DB5657", description: "This is a random description of length 25", timeRequired: "5h 45m" },
  { name: "DHFJGHD", id: 14, x: 500, y: 500, r: 50, color: "#67BB6D", description: "This is a random description of length 25", timeRequired: "12h 0m" },
  { name: "JFGHDFG", id: 15, x: 600, y: 400, r: 40, color: "#3DC7C7", description: "This is a random description of length 25", timeRequired: "6h 15m" },
  { name: "KJGDFHD", id: 16, x: 700, y: 300, r: 100, color: "#D4DC6C", description: "This is a random description of length 25", timeRequired: "9h 30m" },
  { name: "DHFJGHD", id: 17, x: 800, y: 200, r: 50, color: "#9292C8", description: "This is a random description of length 25", timeRequired: "4h 45m" },
  { name: "JFGHDFG", id: 18, x: 900, y: 100, r: 40, color: "#60DAAC", description: "This is a random description of length 25", timeRequired: "7h 0m" },
  { name: "KJGDFHD", id: 19, x: 100, y: 100, r: 100, color: "#DB5657", description: "This is a random description of length 25", timeRequired: "10h 15m" },
  { name: "DHFJGHD", id: 20, x: 200, y: 200, r: 50, color: "#67BB6D", description: "This is a random description of length 25", timeRequired: "3h 30m" },
  { name: "JFGHDFG", id: 21, x: 300, y: 300, r: 40, color: "#3DC7C7", description: "This is a random description of length 25", timeRequired: "6h 45m" },
  { name: "KJGDFHD", id: 22, x: 400, y: 400, r: 100, color: "#D4DC6C", description: "This is a random description of length 25", timeRequired: "11h 0m" },
  { name: "DHFJGHD", id: 23, x: 500, y: 500, r: 50, color: "#9292C8", description: "This is a random description of length 25", timeRequired: "5h 30m" },
  { name: "JFGHDFG", id: 24, x: 600, y: 600, r: 40, color: "#60DAAC", description: "This is a random description of length 25", timeRequired: "8h 45m" },
  { name: "KJGDFHD", id: 25, x: 700, y: 700, r: 100, color: "#DB5657", description: "This is a random description of length 25", timeRequired: "4h 0m" },
  { name: "DHFJGHD", id: 26, x: 800, y: 800, r: 50, color: "#67BB6D", description: "This is a random description of length 25", timeRequired: "9h 15m" },
  { name: "JFGHDFG", id: 27, x: 900, y: 900, r: 40, color: "#3DC7C7", description: "This is a random description of length 25", timeRequired: "2h 30m" },
  { name: "KJGDFHD", id: 28, x: 100, y: 900, r: 100, color: "#D4DC6C", description: "This is a random description of length 25", timeRequired: "7h 45m" },
  { name: "DHFJGHD", id: 29, x: 200, y: 800, r: 50, color: "#9292C8", description: "This is a random description of length 25", timeRequired: "11h 0m" },
  { name: "JFGHDFG", id: 30, x: 300, y: 700, r: 40, color: "#60DAAC", description: "This is a random description of length 25", timeRequired: "5h 15m" }
];

var node = svg.selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("id", d => d.id)
  .attr("transform", d => `translate(${d.x}, ${d.y})`)

node.append("circle")
  .attr("r", d => d.r)
  .attr("fill", d => d.color || "grey")
  .attr("stroke", "black")

node.append("text")
  .text(d => d.name)
  .attr("text-anchor", "middle")
  .attr("dy", "1em");

node.append("text")
    .text(d => d.description)
    .attr("text-anchor", "middle")
    .attr("dy", "2.5em");

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

document.getElementById("addMenuBtn").addEventListener("click", () => {
  document.getElementById("addMenu").style.visibility = "visible";
  document.getElementById("addMenuBtn").style.visibility = "hidden";
});

document.getElementById("closeBtn").addEventListener("click", () => {
  document.getElementById("addMenu").style.visibility = "hidden";
  document.getElementById("addMenuBtn").style.visibility = "visible";
});


function colorSelected(){
  if (document.getElementById("colorTask1").checked){
      return "#DB5657";
  }else if(document.getElementById("colorTask2").checked){
      return "#67BB6D";
  }else if(document.getElementById("colorTask3").checked){
      return "#3DC7C7";
  }else if(document.getElementById("colorTask4").checked){
      return "#D4DC6C";
  }else if(document.getElementById("colorTask5").checked){
      return "#9292C8";
  }else{
      return "#DB5657";
  }
}

document.getElementById("addTaskBtn").addEventListener("click", () => {

    let name = document.getElementById("nameTask").value;
    let date = document.getElementById("dateTask").value;
    let timeRequired = document.getElementById("timeTask").value;
    let description = document.getElementById("descriptionTask").value;
    let color = colorSelected();

    let id = new Date().getTime();
    let newData = {id: id, name:name, description: description, timeRequired: timeRequired, date: date, x: 0, y: 0, r: 50, color: color};
    nodes.push(newData);
    let newNode = svg.append("g")
                  .data([newData])
                  .attr("class", "node")
                  .attr("id", id)
                  .attr("transform", d => `translate(${d.x}, ${d.y})`);
    newNode.append("circle")
          .attr("r", d => d.r)
          .attr("fill", d => d.color || "grey")
          .attr("stroke", "black");
    newNode.append("text")
          .text(d => d.name)
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


