
<template>
  <ContentLoader
    :height="42"
    :width="1300"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="180.41" y="26.27" rx="0" ry="0" width="26.14" height="1"/>
    <rect x="30.45" y="15.27" rx="0" ry="0" width="209.41" height="14"/>
    <rect x="326.31" y="15.27" rx="0" ry="0" width="580.0657" height="14"/>
    <rect x="958.45" y="15.27" rx="0" ry="0" width="150.77519999999998" height="14"/>
    <rect x="1137.43" y="15.27" rx="0" ry="0" width="150.77519999999998" height="14"/>
  </ContentLoader>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  components: {
    ContentLoader
  }
};
</script>
