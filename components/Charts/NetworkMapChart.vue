<template>
  <div ref="chartdiv" class="network-map__chart" />
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow'

import { mapGetters } from 'vuex'
export default {
  components: {},
  data: () => {
    return {}
  },
  computed: mapGetters({
    networkCities: 'network/getNetworkCities',
    networkCountries: 'network/getNetworkCountries',
    latestSigchain: 'latestSigchain/getLatestSigchain'
  }),
  destroyed() {
    clearInterval(this.intervaldrawLine)
  },
  mounted: function() {
    am4core.options.queue = true
    am4core.options.onlyShowOnViewport = true
    am4core.options.queue = true
    am4core.options.onlyShowOnViewport = true

    const chartData = []
    const countriesData = []
    const countries = this.networkCountries
    const cities = this.networkCities

    cities.forEach(city => {
      chartData.push({
        latitude: Number(city.latitude),
        longitude: Number(city.longitude),
        name: city.city,
        count: city.count
      })
    })
    countries.forEach(country => {
      countriesData.push({
        id: country.country_code,
        value: country.count
      })
    })
    const chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart)

    // Set map definition
    chart.geodata = am4geodataWorldLow

    // Set projection
    chart.projection = new am4maps.projections.Miller()
    chart.seriesContainer.draggable = false
    chart.seriesContainer.resizable = false
    chart.maxZoomLevel = 1
    chart.seriesContainer.events.disableType('doublehit')
    chart.chartContainer.background.events.disableType('doublehit')

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())
    // Exclude Antartica
    polygonSeries.exclude = ['AQ']

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#E1E1ED'),
      max: am4core.color('#4A4D5D')
    })
    polygonSeries.data = countriesData

    // Place series
    const placeSeries = chart.series.push(new am4maps.MapImageSeries())
    placeSeries.data = chartData
    placeSeries.tooltip.getFillFromObject = false
    placeSeries.tooltip.background.fill = am4core.color('#5769DF')
    placeSeries.tooltip.label.fill = am4core.color('#fff')
    const place = placeSeries.mapImages.template

    place.tooltipText = '{name} {count}'
    place.nonScaling = true
    place.propertyFields.latitude = 'latitude'
    place.propertyFields.longitude = 'longitude'

    const marker = place.createChild(am4core.Circle)
    marker.radius = 4
    marker.hoverable = true
    marker.fill = am4core.color('#5769df')
    marker.strokeWidth = 1
    marker.stroke = am4core.color('#fff')

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template
    polygonTemplate.tooltipText = '{name} {value}'
    polygonTemplate.fill = am4core.color('#E1E1ED')
    polygonSeries.tooltip.getFillFromObject = false
    polygonSeries.tooltip.background.fill = am4core.color('#363165')
    polygonSeries.tooltip.label.fill = am4core.color('#fff')

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover')
    hs.properties.fill = am4core.color('#363165')

    // Add line series
    const lineSeries = chart.series.push(new am4maps.MapArcSeries())
    lineSeries.mapLines.template.strokeWidth = 4
    lineSeries.mapLines.controlPointDistance = 0.5
    lineSeries.mapLines.template.stroke = am4core.color('#2bd289')
    lineSeries.mapLines.template.nonScalingStroke = true

    const line = lineSeries.mapLines.create()
    const activeNodeSeries = chart.series.push(new am4maps.MapImageSeries())
    activeNodeSeries.tooltip.getFillFromObject = false
    activeNodeSeries.tooltip.background.fill = am4core.color('#363165')
    activeNodeSeries.tooltip.label.fill = am4core.color('#fff')

    const activeNode = activeNodeSeries.mapImages.template
    activeNode.tooltipText = '{name}'
    activeNode.nonScaling = true
    activeNode.propertyFields.latitude = 'latitude'
    activeNode.propertyFields.longitude = 'longitude'

    const activeNodeMarker = activeNode.createChild(am4core.Circle)
    activeNodeMarker.radius = 8
    activeNodeMarker.hoverable = true
    activeNodeMarker.fill = am4core.color('#2BD289')
    activeNodeMarker.strokeWidth = 1
    activeNodeMarker.stroke = am4core.color('#fff')

    const drawLine = () => {
      const latestTx = this.latestSigchain

      if (latestTx) {
        const txPath = []
        const activeNodesData = []

        latestTx.forEach(node => {
          if (node.latitude) {
            txPath.push({
              latitude: node.latitude,
              longitude: node.longitude
            })
            activeNodesData.push({
              latitude: Number(node.latitude),
              longitude: Number(node.longitude),
              name: node.city
            })
          }
        })
        if (txPath.length) {
          activeNodeSeries.data = []
          activeNodeSeries.data = activeNodesData
          line.multiGeoLine = [txPath]
        }
      }
    }
    drawLine()
    this.intervaldrawLine = setInterval(drawLine, 5000)
    chart.homeZoomLevel = 1
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

<style>
#chartdiv {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
