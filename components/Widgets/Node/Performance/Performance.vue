<template>
  <Card>
    <div class="performance">
      <div class="performance__header">
        <h3 class="performance__title">{{$t('nodePerformance')}}</h3>
      </div>
      <NodePerformanceChart/>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import NodePerformanceChart from "~/components/Charts/NodePerformanceChart.vue";

export default {
  components: {
    Card,
    NodePerformanceChart
  },
  data: () => {
    return {};
  },

  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
