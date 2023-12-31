const svg = d3.select("svg");

let svgWidth = document.querySelector("svg").clientWidth;
let svgHeight = document.querySelector("svg").clientHeight;

// Set min date to today
const currentDate = new Date();
document.getElementById("dateTask").setAttribute("min",currentDate.toISOString().slice(0,10));

let nodes = [];

let jwtToken = localStorage.getItem("token");

if (!jwtToken){
  window.location.replace("/login");
}

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${jwtToken}`
}

// Calculate radius of bubble based on date
function calcRadius(date){
  date = new Date(date).getTime();
  var dayDiff = (date - currentDate)/(1000 * 60 * 60 * 24);
  if (dayDiff < 0){
    dayDiff = 0;
  }
  if(dayDiff > 7){
      return 50;
  }else if((dayDiff <= 5)&&(dayDiff >= 2)){
      return 80;
  }else{
      return 100;
  }
}

function prepBubbleData(data){
  let result = data.map(d => {
    d.r = calcRadius(d.date);
    d.x = 0
    d.y = 0
    return d;
  })
  return result;
}

fetch("/data", {headers}).then(res => {
    if (res.status === 500){
      throw new Error("Server error");
    }
    if (res.status === 401){
      window.location.replace("/login");
    }
    return res.json();
  }).then(data => {

  nodes = prepBubbleData(data);

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

    let hoverEnterTimeoutId;

    elm.on("mouseenter", (event, d) => {
      event.stopPropagation();
      hoverElemOrigRad = d.r;
      if (d.r !== 120){
        d.r = 120;
        elm.raise();
        elm.select("circle").transition().duration(500).attr("r", d.r);

        if (hoverEnterTimeoutId) clearTimeout(hoverEnterTimeoutId);
        hoverEnterTimeoutId = setTimeout(() => {
          elm.select("foreignObject").attr("width", "240").attr("height", "240").attr("x", "-120").attr("y", "-120")
          elm.select("foreignObject").selectAll(".task-hidden-info").style("display", "block");
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

        if (hoverEnterTimeoutId) clearTimeout(hoverEnterTimeoutId);
        setTimeout(() => {
          simulation.force("collide", d3.forceCollide(d => d.r + 5).strength(0.8));
          simulation.alpha(0.1).restart();
        }, 500);
      }
    });

  }

  // Remove bubble when double clicked
  function attachPopListener(){
    fetch("/data", {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({id: this.attributes.id.value})
    }).then(res => {
      if (res.status === 500){
        throw new Error("Server error");
      }
      if (res.status === 401){
        window.location.replace("/login");
      }
      return res.json()
    }).then(data => {

      d3.select(this).remove();
      nodes.splice(nodes.findIndex(node => node.id == this.attributes.id.value), 1);
      node = svg.selectAll(".node");

      let radius = d3.select(this).select("circle").attr("r");
      totalBubbleArea -= Math.PI * radius * radius;

      simulation.alpha(0.25).restart();
    }).catch(err => {
      console.log(err);
    });
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

  let showTimeoutId;

  document.getElementById("userMenuBtn").addEventListener("mouseenter", () => {
    document.getElementById("logoutBtn").style.top = "90px";
    if (showTimeoutId) clearTimeout(showTimeoutId);
    showTimeoutId = setTimeout(() => {
      document.getElementById("logoutBtn").style.top = "30px";
    }, 3500);
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
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



  // Add new task to the canvas
  document.getElementById("addTaskBtn").addEventListener("click", () => {

      let name = document.getElementById("nameTask").value;
      let date = document.getElementById("dateTask").value;
      let timeRequired = document.getElementById("timeTask").value;
      let description = document.getElementById("descriptionTask").value;
      let color = colorSelected();
      let radius = calcRadius(date);

      if (name === "" || date === "" || description === "") return;

      let id = new Date().getTime();
      let newData = {name:name, description: description, timeRequired: timeRequired, date: date, color: color};

      fetch("/data", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newData)
      }).then(res => {
        if (res.status === 500){
          throw new Error("Server error");
        }
        if (res.status === 401){
          window.location.replace("/login");
        }
        return res.json()
      }).then(data => {
        newData.id = data.id;
        newData.r = radius;
        newData.x = 0;  
        newData.y = 0;

        //x: 0, y: 0, r: radius,

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
      }).catch(err => {
        console.log(err);
      });
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


}).catch(err => {
  console.log(err);
});