<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Chart/>
    <PieChart/>
    <PieChartInteractive/>
    <HelloWorld msg="Hello End 2"/>
  </div>
</template>

<script >
import Chart from './components/Chart.vue'
import HelloWorld from './components/HelloWorld.vue'
import PieChart from './components/PieChart.vue'
import PieChartInteractive from './components/PieChartInteractive.vue'


export default {
  name: 'App',
  components: {
    Chart,    
    HelloWorld,
    PieChart,
    PieChartInteractive
  }
  
}
</script>

