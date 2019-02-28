<template>
  <div v-if="!price || !networkStatus || !networkNodes" class="preloader">
    <loader-icon class="preloader-icon"></loader-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LoaderIcon } from 'vue-feather-icons'

export default {
  components: {
    LoaderIcon
  },
  data: () => {
    return {}
  },
  computed: mapGetters({
    price: 'price/get',
    networkStatus: 'network/getNetworkStatus',
    networkNodes: 'network/getNetworkNodes'
  }),
  mounted: function() {}
}
</script>
