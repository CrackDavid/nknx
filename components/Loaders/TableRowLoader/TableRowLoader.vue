<template>
  <ContentLoader
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    :speed="1"
    :width="1400"
    :height="20"
  >
    <circle cx="126.92" cy="3.67" r="1" />
    <circle cx="16.1" cy="10.85" r="9.18" />
    <rect x="33.98" y="8" rx="0" ry="0" width="598.92" height="6" />
    <rect x="643.7" y="8" rx="0" ry="0" width="217.86" height="6" />
    <rect x="878.7" y="8" rx="0" ry="0" width="305" height="6" />
    <rect x="1208.7" y="8" rx="0" ry="0" width="176" height="6" />
  </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader },
  props: {
    count: {
      type: Number,
      default: 1
    }
  },
  data: () => {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
