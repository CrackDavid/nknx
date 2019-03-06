<template>
  <div>
    <div class="row">
      <div class="col col_xs_3">
        <NetworkStatus/>
      </div>
    </div>
  </div>
</template>

<script>
import NetworkStatus from '~/components/Widgets/Network/NetworkStatus/NetworkStatus.vue'

export default {
  auth: false,
  components: {
    NetworkStatus
  }
}
</script>
