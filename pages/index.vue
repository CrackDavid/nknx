<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <NetworkState></NetworkState>
    </vs-col>
  </vs-row>
</template>

<script>
import NetworkState from '~/components/Widgets/Network/NetworkState/NetworkState.vue'

export default {
  components: {
    NetworkState
  }
}
</script>
