<template>
  <ContentLoader
    :height="200"
    :width="400"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="4" y="14" rx="4" ry="4" width="117" height="6.4"/>
    <rect x="302" y="13" rx="3" ry="3" width="85" height="6.4"/>
    <rect x="2" y="104" rx="3" ry="3" width="350" height="5.248"/>
    <rect x="2" y="92" rx="3" ry="3" width="380" height="6.4"/>
    <rect x="3" y="168" rx="4" ry="4" width="117" height="6.4"/>
    <rect x="3" y="44" rx="3" ry="3" width="315" height="17.54"/>
    <rect x="2" y="116.65" rx="3" ry="3" width="273" height="4.992000000000001"/>
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
