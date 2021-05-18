<template>
  <span class="node-status">
    <span :class="'node-status_state_' + className">
      <span :class="'node-status__icon fe fe-' + icon"></span>
      <span
        v-if="status === 'GENERATE_ID'"
        v-clipboard:copy="walletAddress"
        class="node-status__text"
        @click="copyAlert"
        style="cursor: pointer"
        >{{ $t(name) }}</span
      >
      <span v-else class="node-status__text">{{ $t(name) }}</span>
      <span
        v-if="status === 'GENERATE_ID'"
        v-tooltip="{
          content: `For the successeful ID generation, you need to send 10 NKN to the node's wallet address: <br><br><b style='font-weight: bold; font-size: 14px;'>${walletAddress}. Click on the status to copy the address to your clipboard.</b> `,
          placement: `bottom-center`,
          offset: 0,
        }"
        class="tooltip-icon fe fe-help-circle"
      ></span>
    </span>
  </span>
</template>

<style lang="scss">
@import './NodeStatus.scss';
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    status: {
      type: String,
      default: 'Offline',
    },
    walletAddress: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      name: '',
      className: '',
      icon: '',
    }
  },
  computed: {
    ...mapGetters({
      userNodes: 'userNodes/getUserNodes',
    }),
  },
  watch: {
    userNodes: function (newVal, oldVal) {
      this.getNodeStatus()
    },
  },
  mounted: function () {
    this.getNodeStatus()
  },
  methods: {
    copyAlert() {
      this.$store.dispatch('snackbar/updateSnack', {
        snack: 'fdCopyAlert',
        color: 'alert',
        timeout: true,
      })
    },
    getNodeStatus() {
      const status = this.status

      switch (status) {
        case 'OFFLINE':
          this.name = 'offline'
          this.className = 'offline'
          this.icon = 'cloud-off'
          break
        case 'GENERATE_ID':
          this.name = 'generatingId'
          this.className = 'generatingId'
          this.icon = 'radio'
          break
        case 'WAIT_FOR_SYNCING':
          this.name = 'syncing'
          this.className = 'syncing'
          this.icon = 'refresh-cw'
          break
        case 'SYNC_STARTED':
          this.name = 'syncing'
          this.className = 'syncing'
          this.icon = 'refresh-cw'
          break
        case 'SYNC_FINISHED':
          this.name = 'syncing'
          this.className = 'syncing'
          this.icon = 'refresh-cw'
          break
        case 'PERSIST_FINISHED':
          this.name = 'mining'
          this.className = 'mining'
          this.icon = 'activity'
          break
        case 'PRUNING_DB':
          this.name = 'pruning'
          this.className = 'pruning'
          this.icon = 'download-cloud'
          break
        default:
          return false
      }
    },
  },
}
</script>
