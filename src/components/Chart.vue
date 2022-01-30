<template>
  <div id="chart"></div>
</template>

<script>
const d3 = require("d3");

export default {
  mounted: function () {
    var margin = { top: 20, right: 30, bottom: 40, left: 90 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var data = [      
        {
            "id": 1,
            "parentid": 1,
            "name": "SC1-DC",
            "total_u": 10000,
            "used_u": 6845,
            "free_u": 3515,
            "total_r": 238,
            "used_r": 162,
            "free_r": 76
        },
        {
            "id": 2,
            "parentid": 1,
            "name": "SC1-ACG1",
            "total_u": 8000,
            "used_u": 7500,
            "free_u": 500,
            "total_r": 190,
            "used_r": 178,
            "free_r": 12
        },
        {
            "id": 3,
            "parentid": 2,
            "name": "P2-DC",
            "total_u": 8500,
            "used_u": 3000,
            "free_u": 5500,
            "total_r": 202,
            "used_r": 71,
            "free_r": 131
        }
    ];
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
  },
};
</script>
