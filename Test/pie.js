//set margin & radius
var margin ={top:20, right: 20, bottom: 20, left:20}
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2;

//create arc generator and pie generator

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Whiskies; });

//define svg

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + radius + "," + height/2 + ")";

//import data
d3.csv("Whisky_Brand.csv").then(function(whiskeyData){

    //parse data
    data.foreach(function(d){
        d.Whiskies = +d.Whiskies;
        d.Votes = +d.Votes;
    });

    var g = svg.selectAll(".arc")
        .data(pie(whiskeyData))
        .enter()
        .append("g")
        .attr("class", "arc");

    //append path of arc

    g.append("path")
        .attr("d", arc)
        .style("fill","blue");

    //append the text

    g.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("dy"), ".35em"
        .text(function(d) {return d.whiskeyData.Whiskies})
});