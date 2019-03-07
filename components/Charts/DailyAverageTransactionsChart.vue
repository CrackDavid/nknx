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
  computed: mapGetters({
    dailyTransactions: 'transactions/getDailyTransactions'
  }),
  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
    let txAverage = this.dailyTransactions
    txAverage = txAverage.slice(0, 7)
    const data = []
    for (let i = txAverage.length - 1; i >= 0; i--) {
      data.push({
        date: new Date(txAverage[i].date),
        count: txAverage[i].count
      })
    }

    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.disabled = true
    dateAxis.renderer.labels.template.disabled = true
    dateAxis.startLocation = 0.5
    dateAxis.endLocation = 0.5
    dateAxis.cursorTooltipEnabled = false
    dateAxis.dateFormats.setKey('day', 'dd/MM')
    dateAxis.periodChangeDateFormats.setKey('day', 'dd/MM')

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.min = 0
    valueAxis.renderer.grid.template.disabled = true
    valueAxis.renderer.baseGrid.disabled = true
    valueAxis.renderer.labels.template.disabled = true
    valueAxis.cursorTooltipEnabled = false

    const gradient1 = new am4core.LinearGradient()
    gradient1.addColor(am4core.color('#61E786'))
    gradient1.addColor(am4core.color('#2CCB96'))

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'count'
    series.tooltipText = '{valueY.value}'
    series.stroke = gradient1
    series.fill = gradient1
    series.fillOpacity = 0.2
    series.tensionX = 0.8
    series.strokeWidth = 2

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.lineY.disabled = true

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
<style lang="scss" scoped>
.price-chart {
  width: 100%;
  height: 120px;
}
</style>
