<template>
  <div
    v-if="price && networkStats && networkStatus && dailyHistoryPrice && dailyTransactions && dailyBlocks && latestSigchain && networkCities && networkCountries && networkProviders && dailyNodes && userWallets && userNodes && networkReleases && userNodesStats"
  >
    <Topbar />
    <Headerbar />
    <Sidebar />
    <nuxt
      class="content"
      :class="[sidebarExpanded ? 'content_collapsed' : null, deleteNodeModalVisible !== false || deleteAllNodesModalVisible !== false || deleteAllWalletsModalVisible !== false || receiveWalletModalVisible !== false || fastDeployModalVisible !== false || newWalletModalVisible !== false || deleteWalletModalVisible !== false || newNodeModalVisible !== false ? 'content_overflow' : null]"
    />
    <transition name="fade">
      <NewWalletModal v-if="newWalletModalVisible" />
      <DeleteWalletModal v-if="deleteWalletModalVisible" />
      <NewNodeModal v-if="newNodeModalVisible" />
      <DeleteNodeModal v-if="deleteNodeModalVisible" />
      <DeleteAllNodesModal v-if="deleteAllNodesModalVisible" />
      <DeleteAllWalletsModal v-if="deleteAllWalletsModalVisible" />
      <ReceiveWalletModal v-if="receiveWalletModalVisible" />
      <FastDeployModal v-if="fastDeployModalVisible" />
    </transition>
  </div>
  <Preloader v-else />
</template>
<script>
import { mapGetters } from 'vuex'

import Sidebar from '~/components/Sidebar/Sidebar'
import Topbar from '~/components/Topbar/Topbar'
import Headerbar from '~/components/Headerbar/Headerbar'
import Preloader from '~/components/Preloader/Preloader'
import NewWalletModal from '~/components/Modals/NewWalletModal/NewWalletModal'
import DeleteWalletModal from '~/components/Modals/DeleteWalletModal/DeleteWalletModal'
import NewNodeModal from '~/components/Modals/NewNodeModal/NewNodeModal'
import DeleteNodeModal from '~/components/Modals/DeleteNodeModal/DeleteNodeModal'
import DeleteAllNodesModal from '~/components/Modals/DeleteAllNodesModal/DeleteAllNodesModal'
import DeleteAllWalletsModal from '~/components/Modals/DeleteAllWalletsModal/DeleteAllWalletsModal'
import ReceiveWalletModal from '~/components/Modals/ReceiveWalletModal/ReceiveWalletModal'
import FastDeployModal from '~/components/Modals/FastDeployModal/FastDeployModal'

export default {
  components: {
    Sidebar,
    Topbar,
    Headerbar,
    Preloader,
    NewWalletModal,
    DeleteWalletModal,
    NewNodeModal,
    DeleteNodeModal,
    DeleteAllNodesModal,
    DeleteAllWalletsModal,
    ReceiveWalletModal,
    FastDeployModal
  },
  data: () => {
    return {
      updateInterval: 300000
    }
  },
  computed: mapGetters({
    newWalletModalVisible: 'modals/getNewWalletModalVisible',
    deleteWalletModalVisible: 'modals/getDeleteWalletModalVisible',
    newNodeModalVisible: 'modals/getNewNodeModalVisible',
    fastDeployModalVisible: 'modals/getFastDeployModalVisible',
    deleteNodeModalVisible: 'modals/getDeleteNodeModalVisible',
    deleteAllNodesModalVisible: 'modals/getDeleteAllNodesModalVisible',
    deleteAllWalletsModalVisible: 'modals/getDeleteAllWalletsModalVisible',
    receiveWalletModalVisible: 'modals/getReceiveWalletModalVisible',
    sidebarExpanded: 'sidebar/get',
    price: 'price/getCurrentPrice',
    networkStats: 'network/getNetworkStats',
    networkStatus: 'network/getNetworkStatus',
    networkCities: 'network/getNetworkCities',
    networkCountries: 'network/getNetworkCountries',
    networkProviders: 'network/getNetworkProviders',
    networkReleases: 'network/getNetworkReleases',
    dailyHistoryPrice: 'price/getDailyHistoryPrice',
    dailyTransactions: 'transactions/getDailyTransactions',
    dailyBlocks: 'blocks/getDailyBlocks',
    dailyNodes: 'nodes/getDailyNodes',
    latestSigchain: 'latestSigchain/getLatestSigchain',
    userWallets: 'userWallets/getUserWallets',
    userNodes: 'userNodes/getUserNodes',
    userNodesStats: 'userNodes/getUserNodesStats',
    userConfig: 'userNodes/getUserConfig'
  }),
  destroyed() {
    clearInterval(this.intervalPrice)
    clearInterval(this.intervalNetworkStats)
    clearInterval(this.intervalNetworkStatus)
    clearInterval(this.intervalNetworkCities)
    clearInterval(this.intervalNetworkCountries)
    clearInterval(this.intervalNetworkProviders)
    clearInterval(this.intervalNetworkReleases)
    clearInterval(this.intervalDailyHistoryPrice)
    clearInterval(this.intervalDailyTransactions)
    clearInterval(this.intervalDailyBlocks)
    clearInterval(this.intervalDailyNodes)
    clearInterval(this.intervalLatestSigchain)
    clearInterval(this.intervalUserWallets)
    clearInterval(this.intervalUserNodes)
    clearInterval(this.intervalUserNodesStats)
  },
  mounted: function() {
    this.updatePrice()
    this.updateNetworkStats()
    this.updateNetworkStatus()
    this.updateNetworkCities()
    this.updateNetworkCountries()
    this.updateNetworkProviders()
    this.updateNetworkReleases()
    this.updateDailyHistoryPrice()
    this.updateDailyTransactions()
    this.updateDailyBlocks()
    this.updateDailyNodes()
    this.updateLatestSigchain()
    this.updateUserWallets()
    this.updateUserNodes()
    this.updateUserNodesStats()

    this.intervalPrice = setInterval(this.updatePrice, this.updateInterval)
    this.intervalNetworkStats = setInterval(
      this.updateNetworkStats,
      this.updateInterval
    )
    this.intervalNetworkStatus = setInterval(
      this.updateNetworkStatus,
      this.updateInterval
    )
    this.intervalNetworkCities = setInterval(
      this.updateNetworkCities,
      this.updateInterval
    )
    this.intervalNetworkCountries = setInterval(
      this.updateNetworkCountries,
      this.updateInterval
    )
    this.intervalNetworkProviders = setInterval(
      this.updateNetworkProviders,
      this.updateInterval
    )
    this.intervalNetworkReleases = setInterval(
      this.updateNetworkReleases,
      this.updateInterval
    )
    this.intervalDailyHistoryPrice = setInterval(
      this.updateDailyHistoryPrice,
      this.updateInterval
    )
    this.intervalDailyTransactions = setInterval(
      this.updateDailyTransactions,
      this.updateInterval
    )
    this.intervalDailyBlocks = setInterval(
      this.updateDailyBlocks,
      this.updateInterval
    )
    this.intervalDailyNodes = setInterval(
      this.updateDailyNodes,
      this.updateInterval
    )
    this.intervalLatestSigchain = setInterval(
      this.updateLatestSigchain,
      this.updateInterval
    )
    this.intervalUserWallets = setInterval(
      this.updateUserWallets,
      this.updateInterval
    )
    ;(this.intervalUserNodes = setInterval(
      this.updateUserNodes,
      this.updateInterval
    )),
      (this.intervalUserNodesStats = setInterval(
        this.updateUserNodesStats,
        this.updateInterval
      ))
  },
  methods: {
    updatePrice() {
      this.$store.dispatch('price/updateCurrentPrice')
    },
    updateNetworkStats() {
      this.$store.dispatch('network/updateNetworkStats')
    },
    updateNetworkStatus() {
      this.$store.dispatch('network/updateNetworkStatus')
    },
    updateNetworkCities() {
      this.$store.dispatch('network/updateNetworkCities')
    },
    updateNetworkCountries() {
      this.$store.dispatch('network/updateNetworkCountries')
    },
    updateNetworkProviders() {
      this.$store.dispatch('network/updateNetworkProviders')
    },
    updateNetworkReleases() {
      this.$store.dispatch('network/updateNetworkReleases')
    },
    updateDailyHistoryPrice() {
      this.$store.dispatch('price/updateDailyHistoryPrice')
    },
    updateDailyTransactions() {
      this.$store.dispatch('transactions/updateDailyTransactions')
    },
    updateDailyBlocks() {
      this.$store.dispatch('blocks/updateDailyBlocks')
    },
    updateDailyNodes() {
      this.$store.dispatch('nodes/updateDailyNodes')
    },
    updateLatestSigchain() {
      this.$store.dispatch('latestSigchain/updateLatestSigchain')
    },
    updateUserWallets() {
      this.$store.dispatch('userWallets/updateUserWallets')
    },
    updateUserNodes() {
      this.$store.dispatch('userNodes/updateUserNodes')
    },
    updateUserNodesStats() {
      this.$store.dispatch('userNodes/updateUserNodesStats')
    }
  }
}
</script>
