
// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1200;
var svgHeight = 660;

var margin = {
  top: 20,
  right: 20,
  bottom: 70,
  left: 40
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("Whisky_Brand.csv").then(function(whiskeyData) {
    if(error) throw error;

    //parse data
    data.foreach(function(d){
        d.Whiskies = +d.Whiskies;
        d.Votes = +d.Votes;
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    //append path of arc

    g.append("path")
        .attr("d", arc)
        .style("fill","blue");

    //append the text

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")")})
        .attr("dy"), ".35em"
        .text(function(d) {return d.data.Whiskies})
    


	// Step 6: Initialize tool tip
	var toolTip = d3.tip()
		.attr("class", "tooltip")
		.offset([80, -60])
		.html(function(d) {
			return (`${d.Brand}<br>Whiskies: ${d.Whiskies}<br>Votes: ${d.Votes}`);
		});

	// Step 7: Create tooltip in the chart
	chartGroup.call(toolTip);

	// Step 8: Create event listeners to display and hide the tooltip
	circlesGroup.on("click", function(data) {
		toolTip.show(data, this);
	})
		// onmouseout event
		.on("mouseout", function(data, index) {
			toolTip.hide(data);
		});

	// Create axes labels
	chartGroup.append("text")
		.attr("transform", `translate(${width / 2}, ${height + margin.tip + 30})`)
		.attr("class", "axisText")
		.text("Whiskey Information");
}).catch(function(error) {
	console.log(error);
});