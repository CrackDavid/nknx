<template>
  <Card col="4">
    <div class="releases">
      <div class="releases__header">
        <h3 class="releases__title">{{$t('latestReleases')}}</h3>
        <a
          class="releases__link"
          target="_blank"
          href="https://github.com/nknorg/nkn/releases"
        >{{$t('viewAll')}}</a>
      </div>
      <div v-for="item in releases" :key="item.id" class="releases__item releases-item">
        <div
          class="releases-item__tag"
          :class="{'releases-item__tag_active':item.active}"
        >{{item.tag_name}}</div>
        <div class="releases-item__body">
          <div class="releases-item__header">
            <div class="releases-item__subtitle">{{$t('networkRelease')}}</div>
            <div class="releases-item__date">
              <span class="fe fe-clock"></span>
              <span>{{$moment(item.created_at).format('DD/MM/YYYY')}}</span>
            </div>
          </div>
          <div class="releases-item__title">{{item.name}}</div>
          <div class="releases-item__description">{{item.body | striphtml | excerpt(20)}}</div>
          <a class="releases-item__more" :href="item.html_url" target="_blank">
            {{$t('viewDetails')}}
            <ArrowRight/>
          </a>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './Releases.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import ArrowRight from '~/assets/icons/arrow-right.svg'
export default {
  components: {
    Card,
    ArrowRight
  },
  data: () => {
    return {
      releases: []
    }
  },
  mounted: function() {
    const self = this
    this.fetchGuthubReleases('nknorg', 'nkn').then(function(data) {
      data.forEach(function(item) {
        item.tag_name = item.tag_name.slice(0, 6)
        item.body = item.body.replace(/\n/gi, '')
        item.body = item.body.replace(/\*/g, '')
      })
      self.releases = data.slice(0, 3)
      self.releases[0].active = true
    })
  },
  methods: {
    async fetchGuthubReleases(profile, repo) {
      const res = await fetch(
        'https://api.github.com/repos/' + profile + '/' + repo + '/releases'
      )
      return res.json()
    }
  }
}
</script>
