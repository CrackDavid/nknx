<template>
  <div ref="chartdiv" class="relayed-messages-chart"/>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import { mapGetters } from "vuex";

am4core.useTheme(am4themesAnimated);

export default {
  computed: mapGetters({
    dailyHistoryPrice: "price/getDailyHistoryPrice"
  }),
  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    chart.numberFormatter.numberFormat = "#a";

    chart.data = [
      {
        name: "1",
        steps: 5000
      },
      {
        name: "2",
        steps: 5000
      },
      {
        name: "3",
        steps: 9000
      },
      {
        name: "4",
        steps: 9000
      },
      {
        name: "5",
        steps: 11000
      },
      {
        name: "6",
        steps: 7000
      },
      {
        name: "7",
        steps: 10500
      },
      {
        name: "8",
        steps: 11000
      },
      {
        name: "9",
        steps: 9000
      },
      {
        name: "10",
        steps: 10500
      },
      {
        name: "11",
        steps: 9500
      },
      {
        name: "12",
        steps: 9000
      },
      {
        name: "13",
        steps: 8000
      }
    ];

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.fontSize = 10;
    categoryAxis.renderer.labels.template.fill = am4core.color("#a2a5b9");
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 1;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = 10;
    valueAxis.renderer.labels.template.fill = am4core.color("#a2a5b9");

    valueAxis.renderer.grid.template.strokeDasharray = "2";
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.line.strokeWidth = 1;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.labels.template.textAlign = "left";
    valueAxis.renderer.labels.template.paddingLeft = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.line.stroke = am4core.color("#a2a5b9");

    const gradient1 = new am4core.LinearGradient();
    gradient1.addColor(am4core.color("#DD5E89"));
    gradient1.addColor(am4core.color("#F7BB97"));
    gradient1.rotation = 90;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "steps";
    series.dataFields.categoryX = "name";
    series.tooltipText = "{valueY.value}";
    series.tooltip.pointerOrientation = "vertical";
    series.stroke = gradient1;
    series.fill = gradient1;
    series.columnsContainer.zIndex = 100;

    var columnTemplate = series.columns.template;
    //columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 8;
    columnTemplate.column.cornerRadius(60, 60, 60, 60);
    columnTemplate.strokeOpacity = 0;

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.price-chart {
  width: 100%;
  height: 220px;
}
</style>
