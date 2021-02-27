function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function buildHbar() {
    // Read the JSON file
    d3.json("data/samples.json").then((data) => {

        // Grab values from the json object to build the plots
        var sampleValues = unpack(data.samples.sample_values);
        var otuIds = unpack(data.samples.otu_ids);
        var otuLabels = unpack(data.samples.otu_labels);

        console.log(sampleValues);
        console.log(otuIds);
        console.log(otuLabels);


    });
}

buildHbar();