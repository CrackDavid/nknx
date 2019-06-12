<template>
  <div>
    <Topbar/>
    <Sidebar/>
    <nuxt/>
  </div>
</template>
<script>
import Sidebar from '~/components/Sidebar/Sidebar'
import Topbar from '~/components/Topbar/Topbar'

export default {
  components: {
    Sidebar,
    Topbar
  }
}
</script>
