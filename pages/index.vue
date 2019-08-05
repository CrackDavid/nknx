
<template>
  <Landing />
</template>

<script>
import Landing from '~/components/Landing/Landing'

export default {
  head() {
    return {
      title: this.$t('home')
    }
  },
  layout: 'landing',
  components: { Landing },
  data: () => ({}),
  mounted: function() {},
  methods: {}
}
</script>
