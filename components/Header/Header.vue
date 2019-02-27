<template>
  <div>
    <div class="header">
      <Topbar/>
      <div class="header-wrapper">
        <Sidebar/>
        <div class="header-nav">
          <div class="row">
            <div class="col-xs-12">
              <div class="box">Header</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
