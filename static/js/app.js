// Initial function that renders the names to the dropdown
function init() {
    d3.json("samples.json").then((importedData) => {
        createOptions(importedData.names, "selDataset");
    });
}

function createOptions(data, cb_element) {
    element = document.getElementById(cb_element);
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement('option');
      option.text = data[i];
      element.appendChild(option);
    }
}

// Function to build the plots
function buildPlots(name) {
    var dropdownMenu = d3.select("#selDataset");
    
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);
    
    // Read the JSON file
    d3.json("samples.json").then((importedData) => {        
        
        // Grab values from the json object to build the plots
        var sampleValues = importedData.samples.map(x => x.sample_values);
        var otuIds = importedData.samples.map(x => x.otu_ids);
        var otuLabels = importedData.samples.map(x => x.otu_labels);

        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);



    });
}

function optionChanged(sample) {
    buildPlots(sample);
}
// Call the inital function
init();

// Event to render the corresponding plots to the selected name from the dropdown
d3.selectAll("#selDataset").on("change", buildPlots);

