<template>
  <Card>{{ mediumNews }}</Card>
</template>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  data: () => {
    return {
      mediumNews: null
    }
  },
  destroyed() {},
  mounted: function() {
    const self = this
    this.fetchFromMedium('nknx').then(function(data) {
      self.mediumNews = data.items
    })
  },
  methods: {
    async fetchFromMedium(name) {
      const res = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/' +
          name
      )
      return res.json()
    }
  }
}
</script>
