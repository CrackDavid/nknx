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
    networkNodes: "network/getNetworkNodes"
  }),

  destroyed() {},
  mounted: function() {
    const chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
    chart.geodata = am4geodataWorldLow;
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#F7F7FA");

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Add some data
    polygonSeries.data = [
      {
        id: "US",
        name: "United States",
        value: 100
      },
      {
        id: "FR",
        name: "France",
        value: 50
      }
    ];

    // Add line series
    var lineSeries = chart.series.push(new am4maps.MapLineSeries());
    lineSeries.mapLines.template.strokeWidth = 4;
    lineSeries.mapLines.template.stroke = am4core.color("#e03e96");
    lineSeries.mapLines.template.nonScalingStroke = true;

    var line = lineSeries.mapLines.create();
    line.multiGeoLine = [
      [
        { latitude: 48.856614, longitude: 2.352222 },
        { latitude: 40.712775, longitude: -74.005973 },
        { latitude: 49.282729, longitude: -123.120738 }
      ]
    ];

    // Add a map object to line
    var bullet = line.lineObjects.create();
    bullet.nonScaling = true;
    bullet.position = 0.5;
    bullet.width = 48;
    bullet.height = 48;
    bullet.horizontalCenter = "middle";
    bullet.verticalCenter = "middle";

    this.chart = chart;

    var plane = bullet.createChild(am4core.Sprite);
    plane.scale = 0.15;
    plane.path =
      "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
    plane.fill = am4core.color("#3e96e0");
    plane.strokeOpacity = 0;

    function goPlane() {
      bullet.animate(
        {
          from: 0,
          to: 1,
          property: "position"
        },
        5000,
        am4core.ease.sinInOut
      );
    }

    goPlane();
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {}
};
</script>
