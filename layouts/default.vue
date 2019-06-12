<template>
  <div>
    <Topbar/>
    <Headerbar/>
    <Sidebar/>
    <nuxt/>
  </div>
</template>
<script>
import Sidebar from '~/components/Sidebar/Sidebar'
import Topbar from '~/components/Topbar/Topbar'
import Headerbar from '~/components/Headerbar/Headerbar'

export default {
  components: {
    Sidebar,
    Topbar,
    Headerbar
  }
}
</script>
