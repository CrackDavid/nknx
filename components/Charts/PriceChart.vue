<template>
  <div ref="chartdiv" class="price-chart"></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import { mapGetters } from 'vuex'

am4core.useTheme(am4themesAnimated)

export default {
  name: 'HelloWorld',
  computed: mapGetters({
    dailyHistoryPrice: 'price/getDailyHistoryPrice'
  }),
  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
    chart.paddingRight = 20

    let usdPrice = this.dailyHistoryPrice.USD
    let nknEth = this.dailyHistoryPrice.ETH
    usdPrice = usdPrice.slice(0, 7)
    nknEth = nknEth.slice(0, 7)

    const data = nknEth
    console.log(usdPrice)
    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.fontSize = 10
    dateAxis.color = '#a2a5b9'
    dateAxis.renderer.grid.template.location = 0.5
    dateAxis.startLocation = 0.5
    dateAxis.endLocation = 0.5
    dateAxis.dateFormats.setKey('day', 'dd/MM')
    dateAxis.periodChangeDateFormats.setKey('day', 'dd/MM')

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.fontSize = 10
    valueAxis.color = '#a2a5b9'
    valueAxis.tooltip.disabled = false
    valueAxis.renderer.minWidth = 35

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'price'

    series.tooltipText = '{valueY.price}'
    chart.cursor = new am4charts.XYCursor()

    this.chart = chart
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.price-chart {
  width: 100%;
  height: 220px;
}
</style>
