<template>
  <div ref="chartdiv" class="node-provider-chart"/>
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
    console.log(this.networkNodes);
    const chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart);
    // Add data
    chart.data = this.networkNodes.providers;

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "provider";

    // Let's cut a hole in our Pie chart the size of 50% the radius
    chart.innerRadius = am4core.percent(55);

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {}
};
</script>
