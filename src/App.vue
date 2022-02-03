<template>
  <div id="app">
    <h3> Bar with tooltip </h3> 
    <BarChartInteractive/><br><br> <br>
    <h3>Pie chart with buttons</h3>
    <p><PieWithButtons width="225" height="225" margin="20" /></p> <br>
    <h3>Generate chart bars</h3>
    <p>  <Chart/> </p> <br>
    <h3>Pie chart static</h3>
    <p><PieChart/> </p> <br>
    
    
  </div>
</template>

<script >
import Chart from './components/Chart.vue'

import PieChart from './components/PieChart.vue'
import BarChartInteractive from './components/BarChartInteractive.vue'
import PieWithButtons from './components/PieWithButtons.vue'


export default {
  name: 'App',
  components: {
    Chart,    
  //  HelloWorld,
    PieChart,
    BarChartInteractive,
    PieWithButtons
  }
  
}
</script>

