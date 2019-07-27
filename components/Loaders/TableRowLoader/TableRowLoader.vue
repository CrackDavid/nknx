<template>
  <tr style="padding-top: 1px;">
    <td v-for="i in count" :key="i">
      <ContentLoader
        class="card_col_12"
        style="margin-top: 8px"
        primaryColor="#BDBDBD"
        :speed="1"
        :height="62"
        :width="1200"
      >
        <rect x="90" y="31" rx="3" ry="3" width="85" height="6" />
        <rect x="0" y="80" rx="3" ry="3" width="350" height="6" />
        <rect x="0" y="100" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="120" rx="3" ry="3" width="201" height="6" />
        <circle cx="30.2" cy="32.2" r="30.2" />
        <rect x="177" y="31" rx="3" ry="3" width="85" height="6" />
        <rect x="288" y="31" rx="3" ry="3" width="250" height="6" />
        <rect x="568" y="31" rx="3" ry="3" width="250" height="6" />
        <rect x="866" y="31" rx="3" ry="3" width="130" height="6" />
        <rect x="1039" y="31" rx="3" ry="3" width="85" height="6" />
      </ContentLoader>
    </td>
  </tr>
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
