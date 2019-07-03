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
    address: {
      type: String,
      default: ''
    },
    snapshots: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      color1: '#DD5E89',
      color2: '#F7BB97'
    }
  },
  computed: mapGetters({
    activeWallet: 'activeWallet/getActiveWallet'
  }),
  watch: {
    activeWallet: function(newVal, oldVal) {
      if (newVal.address === this.address || oldVal.address === this.address) {
        this.drawChart()
      }
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
      if (this.address === this.activeWallet.address) {
        this.color1 = '#61E786'
        this.color2 = '#2CCB96'
      } else {
        this.color1 = '#DD5E89'
        this.color2 = '#F7BB97'
      }
      const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
      let walletData = this.snapshots
      const data = []
      for (let i = 0; i < walletData.length; i++) {
        data.push({
          date: new Date(walletData[i].created_at),
          count: walletData[i].balance,
          opacity: 0
        })
      }

      data[0].opacity = 1
      chart.data = data
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.grid.template.disabled = true
      dateAxis.renderer.labels.template.disabled = true
      dateAxis.cursorTooltipEnabled = false
      dateAxis.baseInterval = {
        timeUnit: 'hour',
        count: 1
      } // hourly
      dateAxis.startLocation = 0.5
      dateAxis.endLocation = 2
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.price-chart {
  height: 70px;
  position: relative;
  top: 20px;
}
</style>
