<template>
  <div ref="chartdiv" class="price-chart"></div>
</template>

<script>
import { mapGetters } from 'vuex'

import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    state: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      userNodes: 'userNodes/getUserNodes'
    })
  },
  watch: {
    userNodes: function(newVal, oldVal) {
      this.drawChart()
    }
  },
  mounted() {
    this.drawChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    drawChart() {
      am4core.options.queue = true
      am4core.options.onlyShowOnViewport = true
      const state = this.state
      let color = '#F4A271'

      if (state === 'PERSIST_FINISHED') {
        color = '#2bd289'
      }

      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      let nodesAverage = this.data
      nodesAverage = nodesAverage.slice(0, 7)
      const data = []
      nodesAverage.forEach(node => {
        data.push({
          date: this.$moment(node.created_at).toDate(),
          count: node.mined * 11.09852
        })
      })

      chart.data = data
      chart.padding(0, 0, 0, 0)

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.grid.template.disabled = true
      dateAxis.renderer.labels.template.disabled = true
      dateAxis.startLocation = 0.5
      dateAxis.endLocation = 0.7
      dateAxis.cursorTooltipEnabled = false

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.grid.template.disabled = true
      valueAxis.renderer.baseGrid.disabled = true
      valueAxis.renderer.labels.template.disabled = true
      valueAxis.cursorTooltipEnabled = false

      chart.cursor = new am4charts.XYCursor()
      chart.cursor.lineY.disabled = true
      chart.cursor.lineX.disabled = true
      chart.cursor.behavior = 'disabled'

      chart.seriesContainer.draggable = false
      chart.seriesContainer.resizable = false
      chart.maxZoomLevel = 1
      chart.seriesContainer.events.disableType('doublehit')
      chart.chartContainer.background.events.disableType('doublehit')

      const series = chart.series.push(new am4charts.LineSeries())
      series.dataFields.dateX = 'date'
      series.dataFields.valueY = 'count'
      series.tooltipText = '{valueY.value} NKN'
      series.tensionX = 0.8
      series.strokeWidth = 2
      series.stroke = color
      series.fill = color

      this.chart = chart
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.price-chart {
  width: 112px;
  height: 20px;
}
</style>
