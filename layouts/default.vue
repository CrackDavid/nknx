<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
        <Topbar/>
      </vs-col>
    </vs-row>
    <vs-row>
      <Sidebar/>
      <nuxt/>
    </vs-row>
  </div>
</template>

<script>
import Topbar from '~/components/Topbar/Topbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'

export default {
  components: {
    Topbar,
    Sidebar
  }
}
</script>
