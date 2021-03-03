# JavaScript-Plotly-Challenge

## Description
Using JavaScript, D3, and Plot.ly to create an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

### Step 1: init Function
Created a dropdown menu that contains all of the subject id numbers for selection
```
// Function to create sample names in a dropdown menu and initialize plots
function init() {
    d3.json("/data/samples.json").then((samplesData) => {

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
```

### Step 2: Plotly Function
Created a horizontal bar chart of the top 10 OTUs found and a bubble chart of all the OTUs found for each individual test subject id
```
// Function to build the horizontal bar chart and bubble chart
function buildPlots(sample) {
    d3.json("/data/samples.json").then((samplesData) => {

        // Filter the samples by ID
        var filteredData = samplesData.samples.filter(x => x.id == sample);

        // Grab the sample_values, otu_ids, and otu_labels for each sample
        var sampleValues = filteredData[0].sample_values;
        var otuIds = filteredData[0].otu_ids;
        var otuLabels = filteredData[0].otu_labels;

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
        
        // Create the hbar chart layout
        var hbarLayout = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100,
                t: 30,
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
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1150
        };

        // Render the bubble chart to the div tag with id "bubble"
        Plotly.newPlot("bubble", bubble, bubbleLayout);
    });
}
```

### Step 3: Demographic Information Function
Created a chart of demographic information that changed with each subject id
```
// Function to grab each sample's demographic info and display in the chart
function demoInfo(sample) {
    d3.json("/data/samples.json").then((samplesData) => {
        
        // Select the demographic info chart by div tag id
        var demoinfoChart = d3.select("#sample-metadata");

        // Clear the demographic info with each ID selection
        demoinfoChart.html("");

        // Get each sample's metadata by filtering each id
        var samplesMetadata = samplesData.metadata.filter(x => x.id == sample)[0];

        // Grab each filtered object's key, value pairs and append a paragraph tag with the data as text
        Object.entries(samplesMetadata).forEach(function([key,value]) {
            demoinfoChart.append("p")
                .text(`${key}: ${value}`);
        });
    });
}
```

### Step 4: Option Change Function
Called both the "buildPlots()" and "demoInfo()" functions to run with each selection of subject id on the webpage
```
// Function to call the buildPlots function in the HTML
function optionChanged(sample) {
    buildPlots(sample);
    demoInfo(sample);
}
```

### Step 5: Initialize the Dashboard
```
// Initialize the webpage plots
init();
```

Link to visit webpage: (https://nickmangarella.github.io/JavaScript-Plotly-Challenge)