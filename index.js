const svg = d3.select("svg");

let svgWidth = document.querySelector("svg").clientWidth;
let svgHeight = document.querySelector("svg").clientHeight;

// Set min date to today
const currentDate = new Date();
document.getElementById("dateTask").setAttribute("min",currentDate.toISOString().slice(0,10));

var nodes = [
    { name: "aaaaaaa", id: 1, x: 100, y: 100, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "12h 30m" },
    { name: "DHFJGHD", id: 2, x: 200, y: 200, r: 80, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 45m" },
    { name: "JFGHDFG", id: 3, x: 300, y: 300, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 15m" },
    { name: "KJGDFHD", id: 4, x: 400, y: 400, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "10h 0m" },
    { name: "DHFJGHD", id: 5, x: 500, y: 500, r: 80, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 30m" },
    { name: "JFGHDFG", id: 6, x: 600, y: 600, r: 50, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "3h 45m" },
    { name: "KJGDFHD", id: 7, x: 700, y: 700, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 0m" },
    { name: "DHFJGHD", id: 8, x: 800, y: 800, r: 80, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 15m" },
    { name: "JFGHDFG", id: 9, x: 900, y: 900, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 30m" },
    { name: "KJGDFHD", id: 10, x: 100, y: 900, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 15m" },
    { name: "DHFJGHD", id: 11, x: 200, y: 800, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "2h 45m" },
    { name: "JFGHDFG", id: 12, x: 300, y: 700, r: 50, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 0m" },
    { name: "KJGDFHD", id: 13, x: 400, y: 600, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 45m" },
    { name: "DHFJGHD", id: 14, x: 500, y: 500, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "12h 0m" },
    { name: "JFGHDFG", id: 15, x: 600, y: 400, r: 80, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 15m" },
    { name: "KJGDFHD", id: 16, x: 700, y: 300, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 30m" },
    { name: "DHFJGHD", id: 17, x: 800, y: 200, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 45m" },
    { name: "JFGHDFG", id: 18, x: 900, y: 100, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 0m" },
    { name: "KJGDFHD", id: 19, x: 100, y: 100, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "10h 15m" },
    { name: "DHFJGHD", id: 20, x: 200, y: 200, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "3h 30m" },
    { name: "JFGHDFG", id: 21, x: 300, y: 300, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 45m" },
    { name: "KJGDFHD", id: 22, x: 400, y: 400, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 0m" },
    { name: "DHFJGHD", id: 23, x: 500, y: 500, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 30m" },
    { name: "JFGHDFG", id: 24, x: 600, y: 600, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 45m" },
    { name: "KJGDFHD", id: 25, x: 700, y: 700, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 0m" },
    { name: "DHFJGHD", id: 26, x: 800, y: 800, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 15m" },
    { name: "JFGHDFG", id: 27, x: 900, y: 900, r: 80, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "2h 30m" },
    { name: "KJGDFHD", id: 28, x: 100, y: 900, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 45m" },
    { name: "DHFJGHD", id: 29, x: 200, y: 800, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 0m" },
    { name: "JFGHDFG", id: 30, x: 300, y: 700, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 15m" }
];

// Create bubble elements
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

let div = node.append("foreignObject")
              .attr("width", d => d.r*2)
              .attr("height", d => d.r*2)
              .attr("x", d => -d.r)
              .attr("y", d => -d.r)

let divBody = div.append("xhtml:body")
                  .attr("class","bubble-body")
                  .append("div")
                  .attr("class","bubble-text-container")

divBody.append("p")
  .attr("class", "task-name")
  .text(d => d.name)

divBody.append("p")
  .attr("class", "task-description task-hidden-info")
  .text(d => d.description)

divBody.append("p")
  .attr("class", "task-date task-hidden-info")
  .text(d => d.date)

divBody.append("p")
  .attr("class", "task-time task-hidden-info")
  .text(d => d.timeRequired)

// Create simulation
let simulation = d3.forceSimulation(nodes)
    .force("x", d3.forceX(svgWidth/2).strength(0.05)) 
    .force("y", d3.forceY(svgHeight/2).strength(0.05))
    .force("center", d3.forceCenter(svgWidth/2, svgHeight/2))
    .force("collide", d3.forceCollide(d => d.r + 5).strength(0.8))

simulation.on("tick", () => {
  node.attr("transform", d => {
    d.x = Math.max(d.r, Math.min(svgWidth - d.r, d.x)); // keep bubbles within svg
    d.y = Math.max(d.r, Math.min(svgHeight - d.r, d.y)); // keep bubbles within svg
    return `translate(${d.x}, ${d.y})`})
  if (simulation.alpha() < 0.001) {
    simulation.stop();
  }
});

// Attach drag listeners to bubbles
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

// Attach hover listeners to bubbles to increase size on hover & show hidden info
function attachHoverListeners(elm){

  let hoverElemOrigRad = 0;

  elm.on("mouseenter", (event, d) => {
    event.stopPropagation();
    hoverElemOrigRad = d.r;
    if (d.r !== 120){
      d.r = 120;
      elm.raise();
      elm.select("circle").transition().duration(500).attr("r", d.r);

      elm.select("foreignObject").attr("width", "240").attr("height", "240").attr("x", "-120").attr("y", "-120")
      elm.select("foreignObject").selectAll(".task-hidden-info").style("display", "block");

      setTimeout(() => {
        simulation.force("collide", d3.forceCollide(d => d.r + 5).strength(0.5));
        simulation.alpha(0.1).restart();
      }, 250);
    }
  });

  elm.on("mouseleave", (event, d) => {
    event.stopPropagation();
    if (hoverElemOrigRad !== 120){
      d.r = hoverElemOrigRad;
      elm.select("circle").transition().duration(500).attr("r", d.r);

      elm.select("foreignObject").attr("width", d.r*2).attr("height", d.r*2).attr("x", -d.r).attr("y", -d.r)
      elm.select("foreignObject").selectAll(".task-hidden-info").style("display", "none");

      setTimeout(() => {
        simulation.force("collide", d3.forceCollide(d => d.r + 5).strength(0.8));
        simulation.alpha(0.1).restart();
      }, 500);
    }
  });

}

// Remove bubble when double clicked
function attachPopListener(){
  d3.select(this).remove();
  nodes.splice(nodes.findIndex(node => node.id == this.attributes.id.value), 1);
  node = svg.selectAll(".node");

  let radius = d3.select(this).select("circle").attr("r");
  totalBubbleArea -= Math.PI * radius * radius;

  simulation.alpha(0.25).restart();
}


// Attach listeners to all bubbles on page load
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


// Get color selected by user
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

// Calculate radius of bubble based on date
function calcRadius(date){
  date = new Date(date).getTime();
  var dayDiff = Math.abs((date - currentDate)/(1000 * 60 * 60 * 24));

  if(dayDiff > 7){
      return 50;
  }else if((dayDiff <= 5)&&(dayDiff >= 2)){
      return 80;
  }else{
      return 100;
  }
}

// Add new task to the canvas
document.getElementById("addTaskBtn").addEventListener("click", () => {

    let name = document.getElementById("nameTask").value;
    let date = document.getElementById("dateTask").value;
    let timeRequired = document.getElementById("timeTask").value;
    let description = document.getElementById("descriptionTask").value;
    let color = colorSelected();
    let radius = calcRadius(date);

    // if (name === "" || date === "" || description === "") return;

    let id = new Date().getTime();
    let newData = {id: id, name:name, description: description, timeRequired: timeRequired, date: date, x: 0, y: 0, r: radius, color: color};

    nodes.push(newData);

    let newNode = svg.append("g")
                  .data([newData])
                  .attr("class", "node")
                  .attr("id", d => d.id)
                  .attr("transform", d => `translate(${d.x}, ${d.y})`);

    newNode.append("circle")
          .attr("r", d => d.r)
          .attr("fill", d => d.color || "grey")
          .attr("stroke", "black");

    let newNodeDiv = newNode.append("foreignObject")
          .attr("width", d => d.r*2)
          .attr("height", d => d.r*2)
          .attr("x", d => -d.r)
          .attr("y", d => -d.r)

    let newNodeDivBody = newNodeDiv.append("xhtml:body")
                                    .attr("class","bubble-body")
                                    .append("div")
                                    .attr("class","bubble-text-container")

    newNodeDivBody.append("p")
                  .attr("class", "task-name")
                  .text(d => d.name)

    newNodeDivBody.append("p")
                  .attr("class", "task-description task-hidden-info")
                  .text(d => d.description)

    newNodeDivBody.append("p")
                  .attr("class", "task-date task-hidden-info")
                  .text(d => d.date)

    newNodeDivBody.append("p")
                  .attr("class", "task-time task-hidden-info")
                  .text(d => d.timeRequired)

    attachHoverListeners(newNode);
    newNode.node().addEventListener("dblclick", attachPopListener);
    
    simulation.nodes(nodes);
    
    newNode.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    totalBubbleArea += Math.PI * radius * radius;
    adjustScreenArea();

    node = svg.selectAll(".node");
    simulation.alpha(0.25).restart();
});

//Dynamically adjust screen size to fit all bubbles & recenter forces

var screenWidth = 100; //css 100% width
var screenHeight = 100; //css 100vh height

let totalBubbleArea = 0;
nodes.forEach(node => {
  totalBubbleArea += Math.PI * node.r * node.r;
});

function reCenterForces(){
  simulation.force("x", d3.forceX(svgWidth/2).strength(0.05));
  simulation.force("y", d3.forceY(svgHeight/2).strength(0.05));
  simulation.force("center", d3.forceCenter(svgWidth/2, svgHeight/2));
  simulation.alpha(0.5).restart();
}

function adjustScreenArea(){
  
  while (totalBubbleArea > 0.6 * svgWidth * svgHeight){
    screenWidth += 10; // adding 10% to width
    screenHeight += 10; //adding 10vh to height
    document.querySelector("svg").style.height = `${screenHeight}vh`;
    document.querySelector("svg").style.width = `${screenWidth}%`;
    svgWidth = document.querySelector("svg").clientWidth;
    svgHeight = document.querySelector("svg").clientHeight;
  }
  reCenterForces();
}

adjustScreenArea();


