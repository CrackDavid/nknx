<template>
  <div ref="chartdiv" class="network-providers__chart"/>
</template>

<script>
import { mapGetters } from 'vuex'

import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)
export default {
  components: {},
  data: () => {
    return {}
  },
  computed: mapGetters({
    networkProviders: 'network/getNetworkProviders'
  }),
  destroyed() {},
  mounted: function() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart)
    // Add data
    chart.data = this.networkProviders.slice(0, 8)

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries())
    pieSeries.labels.template.disabled = true
    pieSeries.ticks.template.disabled = true
    pieSeries.dataFields.value = 'count'
    pieSeries.dataFields.category = 'isp'
    pieSeries.colors.list = [
      am4core.color('#010F3F'),
      am4core.color('#001B7E'),
      am4core.color('#0028BA'),
      am4core.color('#0033F3'),
      am4core.color('#3964F9'),
      am4core.color('#7E9BFF'),
      am4core.color('#C2CFFF'),
      am4core.color('#E6ECFF')
    ]
    pieSeries.tooltip.getFillFromObject = false
    pieSeries.tooltip.autoTextColor = false
    pieSeries.tooltip.html =
      "<div style='display:flex;align-items:center;'><div style='height:8px;width:8px;background:#7E9BFF;border-radius:100%;margin-right:10px;'></div>{category} <span style='color:#000000;font-weight:bold;margin-left:8px;'>{value}</span></div>"
    pieSeries.tooltip.label.fill = am4core.color('#272634')
    pieSeries.tooltip.background.fill = am4core.color('#FFFFFF')
    var shadow = pieSeries.tooltip.background.filters.getIndex(0)
    shadow.dx = 0
    shadow.dy = 1
    shadow.blur = 6
    shadow.opacity = 0.1
    shadow.color = am4core.color('#000')
    // Let's cut a hole in our Pie chart the size of 50% the radius
    chart.innerRadius = am4core.percent(55)
    chart.innerRadius = 100
    var label = chart.seriesContainer.createChild(am4core.Label)
    label.html =
      "<div style='text-align:center;margin-bottom:5px;color:#4D4A5D;font-size:38px;'>" +
      this.networkProviders.length +
      "</div><div style='font-size: 15px;font-weight: 500;color: #A2A5B9;text-align: center;'>Total Providers</div>"
    label.horizontalCenter = 'middle'
    label.verticalCenter = 'middle'
    this.chart = chart
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {}
}
</script>
