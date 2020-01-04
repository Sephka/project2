import pandas as pd

function buildChart(sampledata){
        d3.csv("data/Whiskey_Brand.csv").then((data)=>
        {
            var layout = {
                        title: 'Marker Size',
                        showlegend: false,
                        height: 600,
                        width: 600
                         };
                      
                      Plotly.newPlot('pie', theData, layout);
        }