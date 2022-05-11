function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];


    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// 1. Create the buildCharts function that contains the argument sample, 
    // which is the sample that is selected from the drop down menu.
function buildCharts(sample) {

  // 2. Use d3.json to load and retrieve the samples.json file (code provided)
  d3.json("samples.json").then((data) => {
    console.log(data);

    // 3. Create a variable that holds the array for all the samples. 
    var samplesArray = data.samples;
    console.log(samplesArray);

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var desiredSampleNumber = samplesArray.filter(data => data.id == sample);
    console.log(desiredSampleNumber);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = desiredSampleNumber[0];
    console.log(firstSample)


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;
    console.log(otuIds);
    console.log(otuLabels);
    console.log(sampleValues);



// BAR CHART    
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    // so the otu_ids with the most bacteria are last. 
    var yticks = otuIds.slice(0,10).map(id => "OTU " + id).reverse();
  
    // 8. Create the trace for the bar chart
        // where the x values are the sample_values
    var xticks = sampleValues.slice(0,10).reverse();

        // and the hover text for the bars are the otu_labels in descending order
    var labels = otuLabels.slice(0,10).reverse();

    var barData = {
      x: xticks,
      y: yticks,
      type: 'bar',
      orientation: 'h',
      text: labels      
    };
      
    // 9. Create the layout for the bar chart that includes a title 
    // https://plotly.com/javascript/tick-formatting/
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
    };

    // 10. Use Plotly to plot the bar data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout);

// Deliverable 2 Bubble chart
// https://plotly.com/javascript/bubble-charts/#hover-text-on-bubble-charts

    // 1. Create the trace for the bubble chart.
    // Assign the otu_ids, sample_values, and otu_labels
    // to the x, y, and text properties, respectively.
    var bubbleData = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      //For the mode and marker properties, 
      // the mode is "markers" and the marker property is a dictionary 
      // that defines the size, color, and colorscale of the markers.
      marker: {
        size: sampleValues
        color: otuIds
        colorscale: 'Picnic'
      }
    };

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "SampleValues"},
      // The hovermode should show the text of the bubble on the chart when you hover near that bubble.
      hovermode: 'closest',
      showlegend: false
    };

    // 3. Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}
    //  Deliverable 3
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
       // Make sure that it fits in the <div></div> tag for the gauge id.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}



    // Deliverable 3
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var desiredMetadataSample = 

    //Deliverable 3:
    // 2. Create a variable that holds the first sample in the metadata array.

    //Deliverable 3:
    // 3. Create a variable that converts the washing frequency to a floating point number.
    var washFreq = filteredMetadata.wfreq