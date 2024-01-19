// const { layerGroup } = require("leaflet");

// Define the URL to load sample data
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Function for Bar Chart init
function createBarChart(id) {
    const chartData = sampleData[id];
    console.log(chartData);
    let topNum = 10;
    let plotData = [{
        x: chartData.sample_values.slice(0,topNum).reverse(),
        y: chartData.otu_ids.map(x => 'OTU ' + x).slice(0,topNum).reverse(),
        text: chartData.otu_labels.map(x => x.replace(/;/g, '<br>')).slice(0,topNum).reverse(),
        type: 'bar',
        orientation: 'h'
      }];

      console.log(plotData);

      let layout = {
        title: `ID ${id} Sample Data`
      };

      Plotly.newPlot('bar', plotData, layout);

};

// Create a DataPromise to load JSON async
let selector = d3.select('#selDataset');
let dataPromise = d3.json(url);

const sampleData = {}

dataPromise.then(function(data) {
   // console.log(data);
    data.names.map(k => {selector.append('option').attr('value', k).text(k)});
    data.samples.forEach(entry => {
        sampleData[entry.id] = entry;
    });
    //console.log(sampleData);
}); 

function optionChanged(id) {
    createBarChart(id);
} 
