<template>
  <Card>
    <div class="nodes-map">
      <div class="nodes-map__header">
        <h3 class="nodes-map__heading">{{$t('networkMap')}}</h3>
      </div>
    </div>

    <NodesMapChart/>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import NodesMapChart from "~/components/Charts/NodesMapChart.vue";

export default {
  components: {
    Card,
    NodesMapChart
  },
  data: () => {
    return {};
  },

  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
