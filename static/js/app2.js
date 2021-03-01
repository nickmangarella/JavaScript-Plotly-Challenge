function init() {
    d3.json("samples.json").then((importedData) => {

        importedData.names.forEach((name) => {
            
            var dropdownMenu = d3.select("#selDataset").property("value", name);
            
            dropdownMenu.append("option").text(name);
        });
        var name1 = importedData.names[0];
        buildPlots(name1);
    });
}

function buildPlots() {
    d3.json("samples.json").then((importedData) => {

        var samplesData = [];

        importedData.samples.forEach((sample) => {
            samplesData.push({
                "sample_values": sample.sample_values,
                "otu_ids": sample.otu_ids,
                "otu_labels": sample.otu_labels
            });
        });

        var sortedData = samplesData.sort((a, b) => parseFloat(b.sample_values) - parseFloat(a.sample_values));
        console.log(sortedData);
        
        console.log(sortedData.map(x => x.sample_values).slice(0, 10));

        var hbar = [{
            x: sortedData.map(x => x.sample_values[0]).slice(0, 10),
            y: sortedData.map(x => x.otu_ids[0]).slice(0,10),
            text: sortedData.map(x => x.otu_labels[0]).slice(0, 10),
            type: "bar",
            orientation: "h"
        }];

        var hbarLayout = {
            group: "barmode"
        };

        Plotly.newPlot("bar", hbar, hbarLayout);
    });
}

function optionChanged(sample) {
    buildPlots(sample);
}

// Initialize the webpage features
init();

// Event to render the corresponding plots to the selected name from the dropdown
d3.selectAll("#selDataset").on("change", buildPlots);