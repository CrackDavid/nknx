
<template>
  <Auth />
</template>

<script>
import Auth from '~/components/Auth/Auth'

export default {
  layout: 'auth',
  components: { Auth },
  data: () => ({}),
  created: function() {
    if (this.$auth.user.email_verified_at !== null) {
      this.$router.push({ path: `/` })
    }
  },
  mounted: function() {},
  methods: {}
}
</script>
