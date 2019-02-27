<template>
  <div>
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
</template>

<script>
import Topbar from '~/components/Topbar/Topbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'
import Headerbar from '~/components/Headerbar/Headerbar.vue'

export default {
  components: {
    Topbar,
    Sidebar,
    Headerbar
  }
}
</script>
