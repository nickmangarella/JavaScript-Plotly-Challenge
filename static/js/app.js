// Function to initialize the plots
function init() {
    d3.json("samples.json").then((importedData) => {

        // For each sample name append them to the "dropdownMenu"
        importedData.names.forEach((name) => {
            
            var dropdownMenu = d3.select("#selDataset").property("value", name);
            
            dropdownMenu.append("option").text(name);
        });

        // Default to the first samples plots when visiting the webpage
        var name1 = importedData.names[0];
        buildPlots(name1);
    });
}

// Function to build all plots
function buildPlots() {
    d3.json("samples.json").then((importedData) => {

        // Simplify the samples object to a variable
        var samples = importedData.samples;

        // Sort the data by sample values
        var sortedData = samples.sort((a, b) => parseFloat(b.sample_values) - parseFloat(a.sample_values));

        // Slice the first 10 objects for plotting
        var slicedData = sortedData.slice(0, 10).reverse();
        
        // Create horizontal bar chart
        var hbar = [{
            x: slicedData.map(x => x.sample_values),
            y: slicedData.map(x => x.otu_ids),
            text: slicedData.map(x => x.otu_labels),
            type: "bar",
            orientation: "h"
        }];

        // Layout for horizontal bar chart
        var hbarLayout = {
            group: "barmode"
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

// Event to render the corresponding plots to the selected name from the dropdown
d3.selectAll("#selDataset").on("change", buildPlots);