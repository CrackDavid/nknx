<template>
  <Card>
    <div class="col col_xs_12">
      <div class="row">
        <div class="col col_xs_10">
          <h3>{{$t('latest_news')}}</h3>
        </div>
        <div class="col col_xs_2">
          <span>ICON</span>
        </div>
      </div>
      <div v-for="news in mediumNews" :key="news.title">
        <div class="row">
          <div class="col col_xs_6">
            <span>{{news.pubDate}}</span>
          </div>
          <div class="col col_xs_6">
            <span>by {{news.author}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col col_xs_12">
            <h4>{{news.title}}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col col_xs_12">
            <span>{{news.content | striphtml | excerpt(20)}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col col_xs_12">
            <a :href="news.link">{{$t('read_more')}} -></a>
          </div>
        </div>
        <hr v-if="mediumNews.length > 1">
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  data: () => {
    return {
      mediumNews: [
        {
          title: null
        }
      ]
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
