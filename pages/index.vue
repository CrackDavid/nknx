<template>
  <div class="row">
    <div class="col col_xs_3">
      <NetworkState/>
    </div>
  </div>
</template>

<script>
import NetworkState from '~/components/Widgets/Network/NetworkState/NetworkState.vue'

export default {
  auth: false,
  components: {
    NetworkState
  }
}
</script>
