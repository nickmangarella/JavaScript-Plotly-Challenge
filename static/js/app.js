// Function to create sample names in a dropdown menu
function init() {
    d3.json("samples.json").then((samplesData) => {

        // Grab the dropdownMenu id
        var dropdownMenu = d3.select("#selDataset")

        // For each sample name append them to the "dropdownMenu"
        samplesData.names.forEach((name) => {
            
            dropdownMenu.append("option")
                .text(name)
                .property("value");
        });

        // Default to the first sample's plots and demographic info when visiting the webpage
        buildPlots(samplesData.names[0]);
        demoInfo(samplesData.names[0]);
    });
}

// Function to build all of the plots
function buildPlots(sample) {
    d3.json("samples.json").then((samplesData) => {

        // Grab the sample_values, otu_ids, and otu_labels for a sample
        var sampleValues = samplesData.samples[0].sample_values;
        var otuIds = samplesData.samples[0].otu_ids;
        var otuLabels = samplesData.samples[0].otu_labels;

        // Add text to each OTU ID for plotting
        var idLabels = otuIds.map(x => "OTU " + x);
        
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);


        // Create horizontal bar chart
        var hbar = [{
            x: sampleValues.slice(0,10).reverse(),
            y: idLabels.slice(0,10).reverse(),
            text: otuLabels.slice(0,10),
            type: "bar",
            orientation: "h"
        }];

        var hbarLayout = {
            margin: {
                l: 100,
                r: 100,
                t: 0,
                b: 40
            }
        };
        
        // Render the hbar chart to the div tag with id "bar"
        Plotly.newPlot("bar", hbar, hbarLayout);

        // Create bubble chart
        var bubble = [{
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds
            },
            text: otuLabels
        }];

        // Create the bubble chart layout
        var bubbleLayout = {
            height: 600,
            width: 1200
        };

        // Render the hbar chart to the div tag with id "bar"
        Plotly.newPlot("bubble", bubble, bubbleLayout);
    });
}

// Function to grab each sample's demographic info and display in the chart
function demoInfo(sample) {
    d3.json("samples.json").then((samplesData) => {
        
        // Select the demographic info chart by div tag id
        var demoinfoChart = d3.select("#sample-metadata");

        // Get each sample's metadata
        var sampleMetadata = samplesData.metadata.id;
        console.log(sampleMetadata);

        // Grab each sample's demo info and append each key value pair
        Object.entries(samplesMetadata).forEach(function([key,value]) {
            demoinfoChart.append("p")
                .text(`${key}: ${value}`);
        });
    });
}

// Function to call the buildPlots function in the HTML
function optionChanged(sample) {
    buildPlots(sample);
    demoInfo(sample);
}

// Initialize the webpage plots
init();