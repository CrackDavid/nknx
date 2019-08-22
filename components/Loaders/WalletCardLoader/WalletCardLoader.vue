<template>
  <div
    style="width: 397px; height: 138px;"
    :style="$mq === 'xl' ? 'grid-column: span 3' : 'grid-column: span 12; width: 289px; height: 138px;'"
  >
    <ContentLoader :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <rect x="110" y="28" rx="4" ry="4" width="117" height="6.4" />
      <rect x="110" y="44" rx="3" ry="3" width="85" height="6.4" />
      <rect x="110" y="106.67" rx="3" ry="3" width="318.5" height="6.91" />
      <circle cx="51.7" cy="64.7" r="41.7" />
      <rect x="110" y="86.67" rx="3" ry="3" width="241.5" height="6.91" />
      <rect x="110" y="62.67" rx="3" ry="3" width="302.6" height="6.66" />
      <rect x="291" y="28" rx="4" ry="4" width="117" height="6.4" />
    </ContentLoader>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>
