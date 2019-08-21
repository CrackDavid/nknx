<template>
  <Card :col="$mq === 'xl' ? '4' : '12'">
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
        >{{item.tag_name | nodeVersion}}</div>
        <div class="releases-item__body">
          <div class="releases-item__header">
            <div class="releases-item__subtitle">{{$t('networkRelease')}}</div>
            <div class="releases-item__date">
              <span class="fe fe-clock"></span>
              <span>{{$moment(item.created_at).format('DD/MM/YYYY')}}</span>
            </div>
          </div>
          <div class="releases-item__title text_wrap_none">{{item.name}}</div>
          <div class="releases-item__description">{{item.body | striphtml | excerpt(20)}}</div>
          <a class="releases-item__more" :href="item.html_url" target="_blank">
            {{$t('viewDetails')}}
            <ArrowRight />
          </a>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <a target="_blank" href="https://github.com/nknorg/nkn/releases">{{$t('viewAll')}}</a>
    </div>
  </Card>
</template>

<style lang="scss">
@import './Releases.scss';
</style>

<script>
import { mapGetters } from 'vuex'

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
  computed: mapGetters({
    networkReleases: 'network/getNetworkReleases'
  }),
  mounted: function() {
    this.releases = this.networkReleases
    this.releases[0].active = true
  },
  methods: {}
}
</script>
