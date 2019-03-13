<template>
  <Card>
    <div class="node-provider">
      <div class="node-provider__header">
        <h3 class="node-provider__heading">{{$t('nodeProvider')}}</h3>
      </div>
    </div>

    <NodeProviderChart/>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import NodeProviderChart from "~/components/Charts/NodeProviderChart.vue";

export default {
  components: {
    Card,
    NodeProviderChart
  },
  data: () => {
    return {};
  },

  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
