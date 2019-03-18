<template>
  <div ref="chartdiv" class="nodes-map-chart"/>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodataWorldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import { mapGetters } from "vuex";

am4core.useTheme(am4themesAnimated);

export default {
  components: {},
  data: () => {
    return {};
  },
  computed: mapGetters({
    networkNodes: "network/getNetworkNodes",
    latestSigchainTransaction: "transactions/getLatestSigchainTransaction"
  }),
  methods: {
    getLatestTx() {
      this.$store.dispatch("transactions/getLatestSigchainTransaction");
    }
  },
  destroyed() {
    clearInterval(this.intervalTx);
    clearInterval(this.intervaldrawLine);
  },
  mounted: function() {
    this.intervalTx = setInterval(this.getLatestTx, 60000);
    const chartData = [];
    const countriesData = [];
    let countries = this.networkNodes.countries;
    let nodes = this.networkNodes.cities;
    nodes.forEach(node => {
      chartData.push({
        latitude: Number(node.latitude),
        longitude: Number(node.longitude),
        name: node.city,
        count: node.count
      });
    });
    countries.forEach(country => {
      countriesData.push({
        id: country.countryCode,
        value: country.count
      });
    });
    var chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodataWorldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    polygonSeries.heatRules.push({
      property: "fill",
      target: polygonSeries.mapPolygons.template,
      min: am4core.color("#E1E1ED"),
      max: am4core.color("#4A4D5D")
    });
    polygonSeries.data = countriesData;
    // Place series
    var placeSeries = chart.series.push(new am4maps.MapImageSeries());
    var place = placeSeries.mapImages.template;
    place.tooltipText = "{name} {count}";
    place.nonScaling = true;
    place.propertyFields.latitude = "latitude";
    place.propertyFields.longitude = "longitude";
    placeSeries.data = chartData;
    placeSeries.tooltip.getFillFromObject = false;

    placeSeries.tooltip.background.fill = am4core.color("#5769DF");
    placeSeries.tooltip.label.fill = am4core.color("#fff");

    var marker = place.createChild(am4core.Circle);
    marker.radius = 4;
    marker.hoverable = true;
    marker.fill = am4core.color("#5769df");
    marker.strokeWidth = 1;
    marker.stroke = am4core.color("#fff");

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name} {value}";
    polygonTemplate.fill = am4core.color("#E1E1ED");
    polygonSeries.tooltip.getFillFromObject = false;
    polygonSeries.tooltip.background.fill = am4core.color("#363165");
    polygonSeries.tooltip.label.fill = am4core.color("#fff");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#363165");

    this.chart = chart;

    // Add line series
    var lineSeries = chart.series.push(new am4maps.MapArcSeries());
    lineSeries.mapLines.template.strokeWidth = 4;
    lineSeries.mapLines.controlPointDistance = 0.5;
    lineSeries.mapLines.template.stroke = am4core.color("#2bd289");
    lineSeries.mapLines.template.nonScalingStroke = true;

    var line = lineSeries.mapLines.create();

    const drawLine = () => {
      let latestTx = this.latestSigchainTransaction[0].node_tracing;
      let txPath = [];
      latestTx.forEach(function(node) {
        if (node.latitude) {
          txPath.push({
            latitude: node.latitude,
            longitude: node.longitude
          });
        }
      });
      line.multiGeoLine = [txPath];
    };
    drawLine();
    this.intervaldrawLine = setInterval(drawLine, 65000);

    // Add a map object to line
    var bullet = line.lineObjects.create();
    bullet.nonScaling = true;
    bullet.position = 0.5;
    bullet.width = 48;
    bullet.height = 48;
    bullet.horizontalCenter = "middle";
    bullet.verticalCenter = "middle";

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>
<!-- Styles -->
<style>
#chartdiv {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
</style>
