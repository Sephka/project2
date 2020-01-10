//Varibles for the URL's

//Creating color for each quake
function ratingColor(rate) {
  if (rate > 80) {
    return 'green'
  }
  else if (rate >= 79) {
    return '#greenyellow'
  }
  else if (rate >= 69) {
    return 'gold'
  }
  else {
    return 'red'
  }
};

//creating variables for points of quakes
var distillery = new L.LayerGroup();

d3.json("./Project_2/project2/data/ETLData/distillery.json", function(data) {
  console.log(data);
});








// d3.csv(url, function(data) {
//   L.csv(data.features, {
//     pointToLayer: function (point, latlng) {
//       return L.circleMarker(latlng, {radius: markerSize(point.properties.mag)});
//     },
    
    // style: function (feature) {
    //   return {
    //     fillColor: ratingColor(feature.properties.mag),
    //     fillOpacity: 0.8,
    //     weight: 0.2,
    //     color: 'black'
    //   }
    // },

    // onEachFeature: function (feature, layer) {
    //   layer.bindPopup(
    //     "<h4 style='text-align:center;'>" + new Date(feature.properties.time) + 
    //     "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
    // }
//   }).addTo(distillery);
// });

//Map Creation

function createMap() {
  var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  //baselayer variables
  var baseLayer = {
    "Dark Map": darkMap,
  };
  
  //overlay for map data
  var overLay = {
    // "Plate Lines": tectPlates,
    "Distillery": distillery,
  };

  //map creation
  var myMap = L.map("map", {
    center: [33.4942, -111.9261], // <---- THE DALE
    zoom: 4.0, 
    layers: [darkMap, distillery]
  });

  //layer control 
  L.control.layers(baseLayer, overLay).addTo(myMap);
  
  var legend = L.control({ position: 'bottomright'});

  legend.onAdd = function(){
    var div = L.DomUtil.create("div", "legend");
    return div;
  }
  legend.addTo(myMap);

  document.querySelector(".legend").innerHTML=displayLegend();

  function displayLegend() {
      var legendInfo = [{
          limit: "Highly Rated: 80-90",
          color: "green"
        },{
          limit: "Above Avg: 70-79",
          color: "greenyellow"
        },{
          limit: "Average: 60-69",
          color: "gold"
        },{
          limit: "Low Rated: 0-59",
          color: "red"
        }];

    var header = "<h3>Ratings</h3><hr>";

    var strng = "";

    for (i = 0; i < legendInfo.length; i++) {
      strng += "<p style = \"background-color: " + legendInfo[i].color+"\">"+legendInfo[i].limit+"</p> ";
      }

    return header+strng;
  }
};
createMap(); 
