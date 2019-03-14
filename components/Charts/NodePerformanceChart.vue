<template>
  <div ref="chartdiv" class="node-performance-chart"/>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
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
    const performance = 68;

    const chart = am4core.create(this.$refs.chartdiv, am4charts.GaugeChart);
    chart.innerRadius = -15;

    var axis1 = chart.xAxes.push(new am4charts.ValueAxis());
    axis1.min = 0;
    axis1.max = 100;
    axis1.strictMinMax = true;
    axis1.renderer.radius = am4core.percent(80);
    axis1.renderer.inside = true;
    axis1.renderer.line.strokeOpacity = 0;
    axis1.renderer.ticks.template.strokeOpacity = 1;
    axis1.renderer.ticks.template.length = 2;
    axis1.renderer.ticks.template.stroke = am4core.color("#A2A5B9");
    axis1.renderer.grid.template.disabled = true;
    axis1.renderer.labels.template.disabled = true;

    // Main axis
    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.ticks.template.disabled = true;
    axis.renderer.minGridDistance = 0;
    axis.renderer.labels.template.disabled = true;

    var range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.label.fill = am4core.color("#A2A5B9");
    range0.label.align = "left";
    range0.label.text = "Low";
    range0.label.padding(10, 20, 10, 20);
    range0.label.location = 0.25;
    range0.label.verticalCenter = "top";

    var range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 100;
    range1.label.fill = am4core.color("#A2A5B9");
    range1.label.align = "left";
    range1.label.text = "High";
    range1.label.padding(10, 20, 10, 20);
    range1.label.location = 0.75;
    range1.label.verticalCenter = "top";

    createAxisRange(axis, "#5769DF", 0, performance);
    createAxisRange2(axis1, "#5769DF", 0, performance);

    var hand = chart.hands.push(new am4charts.ClockHand());
    hand.radius = am4core.percent(75);
    hand.pin.radius = 6;
    hand.pin.fill = false;
    hand.pin.stroke = am4core.color("#5769DF");
    hand.pin.strokeWidth = 1;
    hand.startWidth = 0.5;
    hand.endWidth = 0.5;
    hand.innerRadius = 6;
    hand.stroke = am4core.color("#5769DF");
    hand.fill = am4core.color("#5769DF");

    hand.showValue(performance);

    this.chart = chart;
    function createAxisRange(axis, color, from, to) {
      for (var i = from; i <= 100; i = i + 5) {
        var range0 = axis.axisRanges.create();
        range0.value = i;
        range0.endValue = 100;
        range0.grid.radius = 105;
        if (i <= to) {
          range0.grid.stroke = am4core.color(color);
        } else {
          range0.grid.stroke = am4core.color("#A2A5B9");
        }

        range0.grid.strokeWidth = 2;
        range0.grid.strokeOpacity = 1;
      }
    }

    function createAxisRange2(axis, color, from, to) {
      for (var i = from; i <= 100; i = i + 5) {
        var range0 = axis.axisRanges.create();
        range0.value = i;
        range0.endValue = 100;
        if (i <= to) {
          range0.grid.stroke = am4core.color("#fff");
        } else {
          range0.grid.stroke = am4core.color("#fff");
        }

        range0.grid.strokeWidth = 2;
        range0.grid.strokeOpacity = 1;
      }
    }
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {}
};
</script>
