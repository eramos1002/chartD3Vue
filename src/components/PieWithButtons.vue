<template>
  <div>
    <select v-model="value">
      <option disabled value="">Seleccione una medida</option>
      <option value="total_u">Total Us</option>
      <option value="used_u">Used Us</option>
      <option value="free_u">Free Us</option>
      <option value="total_r">Total racks</option>
      <option value="used_r">Used racks</option>
      <option value="free_r">Free racks</option>
    </select>
    <span>Seleccionado: {{ value }}</span> 

    <div id="my_dataviz"></div>
  </div>
</template>

<script>
const d3 = require("d3");

// Datos de prueba
//const remoteData = require('./chart.json');

// Obtener datos (Esto debe ser cambiado para obtenerlos de una API).
//const fetchData = () => new Promise(resolve => resolve(remoteData));

const fetchData = () =>
  fetch("http://192.168.10.72:3000/api/v1/room/")
    .then((r) => r.json())
    .then((result) => result.rooms);

// console.log("fetchData", fetchData)

// Transforma los datos de la API los datos que necesita d3
// field es el campo cuyo valor será representado, e id es la etiqueta de dicho campo
const formatData = (fetchedData, field, id) =>
  fetchedData.reduce(
    (acc, datum) => ({ ...acc, [datum[id]]: datum[field] })
  );

// Escala de colores de d3, definida a nivel global
const color = d3
  .scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(d3.schemeDark2);

// Compute the position of each group on the pie:
const pie = d3
  .pie()
  .value(function (d) {
    return d[1];
  })
  .sort(function (a, b) {
    return d3.ascending(a.key, b.key);
  });
// This make sure that group order remains the same in the pie chart

// Definición de la instancia Vue
export default {
  props: {
    width: {
      default: 450,
      required: false,
      validator: (value) => value > 0,
    },
    height: {
      default: 450,
      required: false,
      validator: (value) => value > 0,
    },
    margin: {
      default: 40,
      required: false,
      validator: (value) => value > 0,
    },
  },

  computed: {
    //radius: vm => Math.min(vm.width, vm.height) / 2 - vm.margin,
    radius() {
      return Math.min(this.width, this.height) / 2 - this.margin;
    },
  },

  data: function () {
    return {
      id: "name",
      value: "used_u",
    };
  },

  mounted: function () {
    // append the svg object to the div called 'my_dataviz'
    this.$svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`);
    //.attr("transform", `translate(${this.width} / 2, ${this.height} / 2)`);
  },

  methods: {
    // A function that create / update the plot
    update: function () {
      fetchData()
        .then((fetchedData) => formatData(fetchedData, this.value, this.id))
        .then((data) => {
          // Map to data and build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
          this.$svg
            .selectAll("path")
            .data(pie(Object.entries(data)))
            .join("path")
            .transition()
            .duration(1000)
            .attr("d", d3.arc().innerRadius(0).outerRadius(this.radius))
            .attr("fill", function (d) {
              return color(d.data[0]);
            })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 1);
        });
    },
  },
  watch: {
    //id: 'update',
    value: "update",
  },
};
</script>
