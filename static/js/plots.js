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

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
   console.log(samples);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
        var firstSample = resultArray[0];
        console.log(firstSample);
        
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        selectedID  = firstSample.otu_ids;
        selectedLabel =  firstSample.otu_labels;
        selectedValue =  firstSample.sample_values;
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    
    
    //sorting and slice for top ten OTU ID
   // var yticks = selectedID.sort((a,b)=>b-a).slice(0,10);
   var yticks = selectedID.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // sort in descending order 
    var otherorder = yticks.sort((a,b)=> b-a)
    //sort and slice for top ten sample value
    var xticks = selectedValue.slice(0, 10).reverse()
    
    // //sort and slice for top ten labels
    var labels = selectedLabel.slice(0, 10).reverse()


    var yticks1 = selectedID.slice(0, 10).map(otuID => otuID).reverse();
    
    console.log(yticks);
    console.log(xticks);

    
    
    // // 8. Create the trace for the bar chart. 
    var trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
       orientation: "h"
        
    };

   
    
    // creating bar data
    var barData = [trace];
    //creating bubble chart data
  
    
    // // 9. Create the layout for the bar chart. 
     var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: {title: "Samples Found"},
        yaxis: {title:"OTU ID"},   
     };


     // Create the layout for the bubble chart.

    // // 10. Use Plotly to plot the data with the layout. 
   Plotly.newPlot("bar", barData,barLayout); 


   var trace1 = {
    x: yticks1,
    y: xticks,
    text:labels,
    mode: 'markers',
    marker: {
        size: xticks,
        color: yticks1,
         
    }
  };


  var bubbleData = [trace1];
  console.log(bubbleData);

  // 2. Create the layout for the bubble chart.
  var bubbleLayout = {
    title: "Bacteria Cultures Per Sample",
    xaxis: {title: "OTU ID"}

    
  };

  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble",bubbleData,bubbleLayout); 
   
  }
  
  
  
  
  
  
  )

 
}



    