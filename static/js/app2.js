function init() {
    d3.json("samples.json").then((importedData) => {

        importedData.names.forEach((name) => {
            
            var dropdownMenu = d3.select("#selDataset").property("value", name);
            var name1 = name[0];
            
            dropdownMenu.append("option").text(name);

            buildPlots(name1)
        });
    });
}

function buildPlots() {

    
}

init();