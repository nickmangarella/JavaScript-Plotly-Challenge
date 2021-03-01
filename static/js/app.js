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

        // Default to the first sample's plots when visiting the webpage
        buildPlots(samplesData.names[0]);
    });
}

// Function to build all of the plots
function buildPlots(sample) {
    d3.json("samples.json").then((samplesData) => {

        // Grab the sample_values, otu_ids, and otu_labels for a sample
        var sampleValues = samplesData.samples[0].sample_values.slice(0,10).reverse();
        var otuIds = samplesData.samples[0].otu_ids.slice(0,10).reverse();
        var otuLabels = samplesData.samples[0].otu_labels.slice(0,10);

        // Add text to each OTU ID for plotting
        otuIds = otuIds.map(x => "OTU " + x);
        
        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);


        // Create horizontal bar chart
        var hbar = [{
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }];

        // Layout for horizontal bar chart
        var hbarLayout = {
            title: "Top 10 OTUs Found"
        };
        
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", hbar, hbarLayout);
    });
}

// Function to call the buildPlots function in the HTML
function optionChanged(sample) {
    buildPlots(sample);
}

// Initialize the webpage plots
init();