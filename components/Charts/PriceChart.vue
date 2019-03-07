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

    let nknUsd = this.dailyHistoryPrice.USD
    let nknEth = this.dailyHistoryPrice.ETH
    nknUsd = nknUsd.slice(0, 7)
    nknEth = nknEth.slice(0, 7)

    const nknPrice = []
    for (let i = 0; i < nknEth.length; i++) {
      nknPrice.push({
        date: nknEth[i].date,
        eth: nknEth[i].price,
        usd: nknUsd[i].price
      })
    }

    const data = nknPrice
    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.fontSize = 10
    dateAxis.renderer.labels.template.fill = am4core.color('#a2a5b9')
    dateAxis.renderer.grid.template.location = 0.5
    dateAxis.startLocation = 0.5
    dateAxis.endLocation = 0.5
    dateAxis.dateFormats.setKey('day', 'dd/MM')
    dateAxis.periodChangeDateFormats.setKey('day', 'dd/MM')

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.fontSize = 10
    valueAxis.renderer.labels.template.fill = am4core.color('#a2a5b9')
    valueAxis.tooltip.disabled = false
    valueAxis.renderer.minWidth = 35

    const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis2.fontSize = 10
    valueAxis2.renderer.labels.template.fill = am4core.color('#a2a5b9')
    valueAxis2.tooltip.disabled = false
    valueAxis2.renderer.minWidth = 35
    valueAxis2.position = 'right' // Why it doesn't work? xD

    const series1 = chart.series.push(new am4charts.LineSeries())
    series1.dataFields.dateX = 'date'
    series1.dataFields.valueY = 'usd'
    series1.tooltipText = '{valueY.usd}'
    series1.stroke = am4core.color('#5FCFF9') // This thing have to be gradient
    series1.strokeWidth = 3

    const series2 = chart.series.push(new am4charts.LineSeries())
    series2.dataFields.dateX = 'date'
    series2.dataFields.valueY = 'eth'
    series2.yAxis = valueAxis2
    series2.tooltipText = '{valueY.eth}'
    series2.stroke = am4core.color('#DD5E89') // This thing have to be gradient
    series2.strokeWidth = 3

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
