<template>
  <Card col="9">
    <div class="network-map">
      <div class="network-map__header">
        <h3 class="network-map__heading">{{$t('networkMap')}}</h3>
      </div>
      <NetworkMapChart/>
    </div>
  </Card>
</template>

<style lang="scss">
@import './NetworkMap.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import NetworkMapChart from '~/components/Charts/NetworkMapChart.vue'
export default {
  components: {
    Card,
    NetworkMapChart
  },
  data: () => {
    return {}
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
