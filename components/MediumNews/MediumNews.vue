<template>
  <Card :col="$mq === 'xl' ? '3' : '12'" row="3">
    <div class="news">
      <div class="news__header">
        <h3 class="news__heading">{{$t('latestNews')}}</h3>
        <div class="news__icon">
          <MediumIcon></MediumIcon>
        </div>
      </div>

      <div v-if="mediumNews.length < 1">
        <NewsLoader v-for="i in itemsOnPage" :key="i"></NewsLoader>
      </div>

      <transition-group v-if="mediumNews.length > 1" tag="div" name="fade-out-in">
        <div v-for="(news, index) in paginatedData" :key="news.title" class="news__item">
          <div class="news-item__header">
            <div class="news-item__date">{{$moment(news.pubDate).format('DD/MM/YYYY')}}</div>
            <div class="news-item__authour">{{$t('by')}} {{news.author}}</div>
          </div>
          <div class="news-item__title text_wrap_none">{{news.title}}</div>
          <div class="news-item__content">{{news.content | striphtml | excerpt(20)}}</div>
          <a class="news-item__more" target="_blank" :href="news.link">
            {{$t('readMore')}}
            <ArrowRight />
          </a>
          <div v-if="index<paginatedData.length-1" class="news-item__divider"></div>
        </div>
      </transition-group>

      <div class="news__footer">
        <div
          class="news__pages"
        >{{$t('showing')}} {{currentNumber}} {{$t('of')}} {{mediumNews.length}}</div>
        <div class="news__buttons">
          <div v-if="pageNumber != 0" class="news__button news__button_prev" @click="prevPage">
            <span class="fe fe-chevron-left"></span>
          </div>
          <div
            v-if="pageNumber <= pageCount -1"
            class="news__button news__button_next"
            @click="nextPage"
          >
            <span class="fe fe-chevron-right"></span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './MediumNews.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import NewsLoader from '~/components/Loaders/NewsLoader/NewsLoader.vue'
import MediumIcon from '~/assets/icons/medium.svg'
import ArrowRight from '~/assets/icons/arrow-right.svg'

export default {
  components: {
    Card,
    MediumIcon,
    ArrowRight,
    NewsLoader
  },
  data: () => {
    return {
      pageNumber: 0,
      itemsOnPage: 3,
      currentItems: 3,
      currentNumber: 3,
      mediumNews: []
    }
  },
  computed: {
    pageCount() {
      const dataLength = this.mediumNews.length
      return Math.floor(dataLength / this.itemsOnPage)
    },
    paginatedData() {
      const start = this.pageNumber * this.itemsOnPage
      const end = start + this.itemsOnPage
      return this.mediumNews.slice(start, end)
    }
  },
  destroyed() {},
  mounted: function() {
    const self = this
    this.fetchFromMedium('nknetwork').then(function(data) {
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
    },
    nextPage() {
      this.pageNumber++
      this.currentNumber += this.paginatedData.length
      this.currentItems = this.paginatedData.length
    },
    prevPage() {
      this.pageNumber--
      this.currentNumber -= this.currentItems
      this.currentItems = this.paginatedData.length
    }
  }
}
</script>
