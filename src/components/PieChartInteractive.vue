<template>
    <div id="my_dataviz">
        <div id="tooltip" class="hidden">
      <p><strong>Important Label Heading</strong></p>
      <p><span id="value">100</span>%</p>
    </div>
    </div>
</template>

<script>
const d3 = require("d3");

const mousemove = (event) => {
  const posX = event.clientX - 400;
  const posY = event.clientY - 100;

  d3.select('#tooltip')
    //.style("transform", "translateY(-55%)")
    .style('left', posX + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style('top', posY + 'px');
};

const mouseleave = () => {
  d3.select('#tooltip').style('opacity', 0);
};

const mouseover = (event, d) => {
  const {count, type} = d.data
  d3.select('#tooltip')
    .html(type +" : "+ count)
    .style('top', d3.pointer(event)[1] + 'px')
    .style('opacity', 1);
};

export default {
  mounted: function () {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // get the data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv"
    ).then(function (data) {
      // X axis: scale and draw:
      const x = d3
        .scaleLinear()
        .domain([0, 1000]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // set the parameters for the histogram
      const histogram = d3
        .histogram()
        .value(function (d) {
          return d.price;
        }) // I need to give the vector of value
        .domain(x.domain()) // then the domain of the graphic
        .thresholds(x.ticks(70)); // then the numbers of bins

      // And apply this function to data to get the bins
      const bins = histogram(data);

      // Y axis: scale and draw:
      const y = d3.scaleLinear().range([height, 0]);
      y.domain([
        0,
        d3.max(bins, function (d) {
          return d.length;
        }),
      ]); // d3.hist has to be called before the Y axis obviously
      svg.append("g").call(d3.axisLeft(y));
/*
      // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
      // Its opacity is set to 0: we don't see it by default.
      const tooltip = d3
        .select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("color", "white")
        .style("border-radius", "5px")
        .style("padding", "10px");

      // A function that change this tooltip when the user hover a point.
      // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
      const showTooltip = function (event, d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip
          .html("Range: " + d.x0 + " - " + d.x1)
          .style("left", event.x / 2 - 100 + "px")
          .style("top", event.y / 2 + "px");
      };
      const moveTooltip = function (event) {
        tooltip
          .style("left", event.x / 2 - 100 + "px")
          .style("top", event.y / 2 + "px");
      };
      // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
      const hideTooltip = function () {
        tooltip.transition().duration(100).style("opacity", 0);
      };
*/
      // append the bar rectangles to the svg element
      svg
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", 1)
        .attr("transform", function (d) {
          return `translate(${x(d.x0)}, ${y(d.length)})`;
        })
        .attr("width", function (d) {
          return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function (d) {
          return height - y(d.length);
        })
        .style("fill", "#69b3a2")
        // Show tooltip on hover
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
        /*
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip);
        */
    });
  },
};
</script>
