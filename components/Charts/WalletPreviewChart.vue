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
  props: {
    color1: {
      type: String,
      default: ''
    },
    color2: {
      type: String,
      default: ''
    }
  },
  computed: mapGetters({
    dailyBlocks: 'blocks/getDailyBlocks'
  }),
  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
    let blocksAverage = this.dailyBlocks
    blocksAverage = blocksAverage.slice(0, 7)
    const data = []
    for (let i = blocksAverage.length - 1; i >= 0; i--) {
      data.push({
        date: new Date(blocksAverage[i].date),
        count: blocksAverage[i].count,
        opacity: 0
      })
    }
    data[data.length - 1].opacity = 1
    chart.data = data
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.disabled = true
    dateAxis.renderer.labels.template.disabled = true
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
    gradient1.addColor(am4core.color(this.color1))
    gradient1.addColor(am4core.color(this.color2))
    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'count'
    series.stroke = gradient1
    series.fill = gradient1
    series.fillOpacity = 0
    series.tensionX = 0.8
    series.strokeWidth = 2
    var bullet = series.bullets.push(new am4charts.CircleBullet())
    bullet.circle.opacity = 0
    bullet.circle.propertyFields.opacity = 'opacity'
    bullet.stroke = am4core.color(this.color2)
    bullet.stroke.alpha = 0.5
    bullet.circle.strokeWidth = 8
    bullet.circle.radius = 4
    bullet.circle.fill = am4core.color(this.color2)
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
  height: 70px;
  top: 20px;
  position: relative;
}
</style>
