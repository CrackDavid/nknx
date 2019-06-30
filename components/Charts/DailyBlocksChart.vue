<template>
  <div ref="chartdiv" class="price-chart"></div>
</template>

<script>
import { mapGetters } from 'vuex'

import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)

export default {
  computed: mapGetters({
    dailyBlocks: 'blocks/getDailyBlocks'
  }),

  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
    let blocksAverage = this.dailyBlocks
    const data = []
    for (let i = blocksAverage.length - 1; i >= blocksAverage.length - 7; i--) {
      data.push({
        date: new Date(blocksAverage[i].date),
        count: blocksAverage[i].count
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
    gradient1.addColor(am4core.color('#DD5E89'))
    gradient1.addColor(am4core.color('#F7BB97'))
    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'count'
    series.tooltipText = '{valueY.value}'
    series.stroke = gradient1
    series.fill = gradient1
    series.fillOpacity = 0.1
    series.tensionX = 0.8
    series.strokeWidth = 2
    chart.cursor = new am4charts.XYCursor()
    chart.cursor.lineY.disabled = true
    chart.cursor.lineX.disabled = true
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
