<template>
  <div>
    <div class="row">
      <div class="col col_xs_3">
        <NetworkStatus/>
      </div>
      <div class="col col_xs_3">
        <DailyAverageTransactions/>
      </div>
      <div class="col col_xs_3">
        <DailyAverageBlocks/>
      </div>
    </div>
    <div class="row">
      <div class="col col_xs_9">
        <NodesMap/>
      </div>
      <div class="col col_xs_3">
        <NodeProvider/>
      </div>
    </div>
    <div class="row">
      <div class="col col_xs_8"></div>
      <div class="col col_xs_4">
        <Releases/>
      </div>
    </div>
  </div>
</template>

<script>
import NetworkStatus from "~/components/Widgets/Network/NetworkStatus/NetworkStatus.vue";
import DailyAverageTransactions from "~/components/Widgets/Network/DailyAverageTransactions/DailyAverageTransactions.vue";
import DailyAverageBlocks from "~/components/Widgets/Network/DailyAverageBlocks/DailyAverageBlocks.vue";
import NodesMap from "~/components/Widgets/Network/NodesMap/NodesMap.vue";
import NodeProvider from "~/components/Widgets/Network/NodeProvider/NodeProvider.vue";
import Releases from "~/components/Widgets/News/Releases/Releases.vue";

export default {
  auth: false,
  components: {
    NetworkStatus,
    DailyAverageTransactions,
    DailyAverageBlocks,
    Releases,
    NodesMap,
    NodeProvider
  }
};
</script>
