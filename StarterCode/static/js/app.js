// Define the URL to load sample data
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Function for Bar Chart init
function createBarChart(sampleData) {
    console.log(sampleData);
};

// Create a DataPromise to load JSON async
let dataPromise = d3.json(url);

dataPromise.then(function(data) {
    console.log(data);

    createBarChart(data.samples);
});