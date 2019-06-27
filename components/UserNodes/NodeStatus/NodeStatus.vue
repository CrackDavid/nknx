<template>
  <span class="node-status">
    <span :class="'node-status_state_'+ className">
      <span :class="'node-status__icon fe fe-' + icon"></span>
      <span class="node-status__text">{{$t(name)}}</span>
    </span>
  </span>
</template>

<style lang="scss">
@import './NodeStatus.scss';
</style>

<script>
export default {
  components: {},
  props: {
    status: {
      type: String,
      default: 'Offline'
    },
    online: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      name: '',
      className: '',
      icon: ''
    }
  },

  mounted: function() {
    this.getNodeStatus()
  },
  methods: {
    getNodeStatus() {
      const status = this.status
      const online = this.online

      if (online === false) {
        this.name = 'offline'
        this.className = 'offline'
        this.icon = 'cloud-off'
      } else {
        switch (status) {
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
          default:
            return false
        }
      }
    }
  }
}
</script>
