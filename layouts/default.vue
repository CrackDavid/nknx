<template>
  <div>
    <Topbar/>
    <Header/>
    <nuxt/>
  </div>
</template>

<script>
import Topbar from '~/components/Topbar/Topbar.vue'
import Header from '~/components/Header/Header.vue'

export default {
  components: {
    Topbar,
    Header
  }
}
</script>
