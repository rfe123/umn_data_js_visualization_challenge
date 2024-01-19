// const { layerGroup } = require("leaflet");

// Define the URL to load sample data
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Function for Bar Chart init
function createBarChart(chartData) {
    console.log(chartData);

    let topNum = 10;

    let plotData = [{
        x: chartData.sample_values.slice(0, topNum).reverse(),
        y: chartData.otu_ids.slice(0, topNum).reverse().map(x => 'OTU ' + x),
        text: chartData.otu_labels.slice(0, topNum).reverse().map(x => x.replace(/;/g, '<br>')),
        type: 'bar',
        orientation: 'h'
    }];

    console.log(plotData);

    let layout = {
        title: `ID ${chartData.id} Sample Data`,
        xaxis: { title: 'Count' },
        yaxis: { title: 'OTU IDs' }
    };

    Plotly.newPlot('bar', plotData, layout);

};

// When selector is changed, populate the chart.
function optionChanged(id) {
    const chartData = sampleData[id];
    createBarChart(chartData);
};

// Create a DataPromise to load JSON async
let selector = d3.select('#selDataset');
let dataPromise = d3.json(url);

const sampleData = {}

dataPromise.then(function (data) {
    // Append the ID names to the Selector
    console.log(data.samples[0]);

    data.names.map(k => { selector.append('option').attr('value', k).text(k) });

    //Create a keyed Samples dictionary for lookup later

    data.samples.forEach(entry => {
        sampleData[entry.id] = entry
    });

    //init the charts with first record
    optionChanged(data.names[0]);
}); 
