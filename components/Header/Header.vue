<template>
  <div>
    <vs-navbar v-model="activeItem" class="nabarx header">
      <div slot="title">
        <vs-navbar-title>
          Hello world
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">News</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Update</a>
      </vs-navbar-item>
    </vs-navbar>
    <Sidebar/>
  </div>
</template>
<script>
import Sidebar from '~/components/Sidebar/Sidebar.vue'

export default {
  components: {
    Sidebar
  },
  data: () => ({
    activeItem: 0
  })
}
</script>
