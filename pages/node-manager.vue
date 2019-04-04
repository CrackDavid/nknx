<template>
  <div class="node-manager">
    <div class="node-manager__top">
      <div class="node-manager__header">
        <div class="row">
          <div class="col col_xs_9">
            <div class="node-manager__left">
              <div class="node-manager__title">{{$t('myNodes')}}</div>
              <div class="node-manager__status">
                <span class="node-manager__indicator node-manager__indicator_positive"></span> All nodes online
              </div>
            </div>
          </div>
          <div class="col col_xs_3">
            <div class="node-manager__right"></div>
          </div>
        </div>
      </div>
      <NodesAverageStats/>
    </div>
  </div>
</template>

<script>
import NodesAverageStats from "~/components/Widgets/Node/NodesAverageStats/NodesAverageStats.vue";

export default {
  auth: false,
  components: {
    NodesAverageStats
  }
};
</script>
