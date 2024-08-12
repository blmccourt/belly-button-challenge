//********************************************************
// Function to build the metadata panel
//********************************************************
function buildMetadata(selectedValue) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
    .then((data) => {
      let sampleMetaData = d3.select("#sample-metadata");
      // Clear any existing metadata
      sampleMetaData.html("");
      
      // Get the metadata field
      let metadata = data.metadata;

      // Filter the metadata for the object with the desired sample number
      let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      let result = filteredData[0];

      if (sampleMetaData.empty()) {
        console.error("Element with ID #sample-metadata not found.");
        return;
      }

      // Inside a loop, use d3 to append new
      // tags for each key-value in the filtered metadata.
      Object.entries(result).forEach(([key, value]) => {
        sampleMetaData.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    })
    .catch((error) => {
      // Handle errors if any
      console.error("Error loading or processing the JSON data:", error);
      d3.select("#sample-metadata").text("Error loading metadata.");
    });
}

//********************************************************
// Function to build both charts
//********************************************************
function buildCharts(selectedValue) {
  // Clear previous charts
  d3.select("#bubble").html("");
  d3.select("#bar").html("");

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
    .then((data) => {
      // Get the samples field
      let samples = data.samples;

      // Filter the samples for the object with the desired sample number
      let filteredData = samples.filter(
        (sampleObj) => sampleObj.id == selectedValue
      );
      let result = filteredData[0];

      // Get the otu_ids, otu_labels, and sample_values
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;

      // Build a Bubble Chart
      let bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth",
          },
        },
      ];

      let bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Number of Bacteria" },
        hovermode: "closest",
      };

      // Render the Bubble Chart
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

      // For the Bar Chart, map the otu_ids to a list of strings for yticks
      let yticks = otu_ids
        .slice(0, 10)
        .map((otuID) => `OTU ${otuID}`)
        .reverse();

      // Build a Bar Chart
      let barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        },
      ];

      let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 },
      };

      // Render the Bar Chart
      Plotly.newPlot("bar", barData, barLayout);
    })
    .catch((error) => {
      // Handle errors if any
      console.error("Error loading or processing chart data:", error);
      d3.select("#bubble").text("Error loading bubble chart.");
      d3.select("#bar").text("Error loading bar chart.");
    });
}

//********************************************************
// Function for event listener
//********************************************************
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  console.log("Sample selected:", newSample);
  buildMetadata(newSample);
  buildCharts(newSample);
}

//********************************************************
// Function to run on page load
//********************************************************
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
    .then((data) => {
      console.log(`Data: ${data}`);

      // Get the names field
      let names = data.names;

      // Use d3 to select the dropdown with id of `#selDataset`
      let dropdownMenu = d3.select("#selDataset");

      // Use the list of sample names to populate the select options
      names.forEach((name) => {
        dropdownMenu.append("option").text(name).property("value", name);
      });

      // Get the first sample from the list
      let name = names[0];

      // Build charts and metadata panel with the first sample
      buildMetadata(name);
      buildCharts(name);
    })
    .catch((error) => {
      // Handle errors if any
      console.error("Error loading or processing the JSON data:", error);
      d3.select("#selDataset").text("Error initializing dashboard.");
    });
}

// Initialize the dashboard
init();