<template>
  <div>
    <button v-on:click="generateChart">Generate chart</button>

    <div id="chart"></div>
  </div>
</template>

<script>
  const d3 = require("d3");
  const remoteData = require('./chart.json');
  const fetchData = () => new Promise(resolve => resolve(remoteData));

  const margin = { top: 20, right: 30, bottom: 40, left: 90 };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const generateChart = function (data) {
    // append the svg object to the body of the page
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    var x = d3.scaleLinear().domain([0, 12000]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.name;
        })
      )
      .padding(0.1);
    svg.append("g").call(d3.axisLeft(y));

    //Bars
    svg
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("width", function (d) {
        return x(d.total_u);
      })
      .attr("height", y.bandwidth())
      .attr("fill", "red");
  }

  export default {
    methods: {
      generateChart: function() {
        fetchData()
        .then(generateChart)
        .catch(console.error);
      }
    }
  };
</script>
