<template>
  <div>
    <preloader
      v-if="!price || !networkStatus || !networkNodes || !dailyTransactions || !dailyBlocks"
    />
    <div
      v-if="price && networkStatus && networkNodes && dailyTransactions && dailyBlocks"
      class="page-wrapper"
    >
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <Topbar/>
        </vs-col>
      </vs-row>
      <vs-row>
        <Sidebar/>
        <div class="main">
          <vs-row>
            <vs-col vs-w="12">
              <headerbar/>
            </vs-col>
          </vs-row>
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
              <nuxt/>
            </vs-col>
          </vs-row>
        </div>
      </vs-row>
    </div>
  </div>
</template>

<script>
import Preloader from '~/components/Preloader/Preloader.vue'
import Topbar from '~/components/Topbar/Topbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'
import Headerbar from '~/components/Headerbar/Headerbar.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Preloader,
    Topbar,
    Sidebar,
    Headerbar
  },
  computed: mapGetters({
    price: 'price/get',
    networkStatus: 'network/getNetworkStatus',
    networkNodes: 'network/getNetworkNodes',
    dailyTransactions: 'transactions/getDailyTransactions',
    dailyBlocks: 'blocks/getDailyBlocks'
  }),
  mounted: function() {
    this.$store.dispatch('network/getCurrentNetworkStatus')
    this.$store.dispatch('network/getCurrentNetworkNodes')
    this.$store.dispatch('price/getCurrentPrice')
    this.$store.dispatch('transactions/getDailyTransactions')
    this.$store.dispatch('blocks/getDailyBlocks')
  }
}
</script>
