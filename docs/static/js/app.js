// const { layerGroup } = require("leaflet");

// Define the URL to load sample data
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Function for Bar Chart init
function createBarChart(chartData) {
    console.log(chartData);

    // control number of records - top 10. Slice each array for this many records and format
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

function displayMetaData(thisData) {
    //Select the div for Metadata
    let metadataDiv = d3.select("#sample-metadata");
    //Clear existing content
    metadataDiv.selectAll('*').remove();

    //Append <p>key: value </p> for each record of metadata
    metadataDiv.selectAll('p')
        .data(Object.entries(thisData))
        .enter()
        .append('p')
        .text(d => `${d[0]}: ${d[1]}`);
};

// When selector is changed, populate the chart.
function optionChanged(id) {
    displayMetaData(sampleMetadata[id]);
    createBarChart(sampleData[id]);
};

// Create a DataPromise to load JSON async
let selector = d3.select('#selDataset');
let dataPromise = d3.json(url);

const sampleData = {};
const sampleMetadata = {};

dataPromise.then(function (data) {
    console.log(data);
    // Append the ID names to the Selector
    data.names.map(k => { selector.append('option').attr('value', k).text(k) });

    //Create keyed Sample and MetaData dictionaries for lookup later

    data.samples.forEach(entry => {
        sampleData[entry.id] = entry;
    });

    data.metadata.forEach(entry => {
        sampleMetadata[entry.id] = entry;
    });

    //init the charts with first record
    optionChanged(data.names[0]);
}); 