<template>
  <div class="node-manager">
    <div class="node-manager__top">
      <div class="node-manager__header col col_xs_12">
        <div class="node-manager__left">
          <div class="node-manager__title">{{$t('myNodes')}}</div>
          <div class="node-manager__status">
            <span class="node-manager__indicator node-manager__indicator_positive"></span> All nodes online
          </div>
        </div>
        <div class="node-manager__right">
          <button
            class="node-manager__button btn btn_type_default btn_theme_primary btn_size_small btn_icon_chart"
            disabled
          ></button>
          <button
            class="node-manager__button btn btn_type_default btn_theme_primary btn_size_small btn_icon_report"
            disabled
          >{{$t('miningReport')}}</button>
          <button
            class="node-manager__button btn btn_type_default btn_theme_primary btn_size_small btn_icon_plus"
          >{{$t('addNode')}}</button>
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
