// Read the JSON file
d3.json("data/samples.json").then((data) => {

    // Grab values from the json object to build the plots
    var sampleValues = data.samples.sample_values
    var otuIds = data.samples.otu_ids
    var otuLabels = data.samples.otu_labels
});