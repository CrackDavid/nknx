<template>
  <Card>
    <div class="timeline">
      <div class="timeline__header">
        <div class="timeline__title">{{$t('latestReleases')}}</div>
        <a
          class="timeline__link"
          target="_blank"
          href="https://github.com/nknorg/nkn/releases"
        >{{$t('viewAll')}}</a>
      </div>
      <div class="timeline__item timeline-item" v-for="item in releases" :key="item.id">
        <div
          class="timeline-item__tag"
          :class="{'timeline-item__tag_active':item.active}"
        >{{item.tag_name}}</div>
        <div class="timeline-item__body">
          <div class="timeline-item__header">
            <div class="timeline-item__subtitle">{{$t('networkRelease')}}</div>
            <div class="timeline-item__date">
              <span class="fe fe-clock"></span>
              <span>{{$moment(item.created_at).format('DD/MM/YYYY')}}</span>
            </div>
          </div>
          <div class="timeline-item__title">{{item.name}}</div>
          <div class="timeline-item__description">{{item.body | striphtml | excerpt(20)}}</div>
          <a class="timeline-item__more" :href="item.html_url" target="_blank">
            {{$t('viewDetails')}}
            <ArrowRight/>
          </a>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import ArrowRight from "~/assets/icons/arrow-right.svg";

export default {
  components: {
    Card,
    ArrowRight
  },
  data: () => {
    return {
      releases: []
    };
  },
  mounted: function() {
    const self = this;
    this.fetchGuthubReleases("nknorg", "nkn").then(function(data) {
      data.forEach(function(item) {
        item.tag_name = item.tag_name.slice(0, 6);
        item.body = item.body.replace(/\n/gi, "");
        item.body = item.body.replace(/\*/g, "");
      });
      self.releases = data.slice(0, 3);
      self.releases[0].active = true;
    });
  },
  methods: {
    async fetchGuthubReleases(profile, repo) {
      const res = await fetch(
        "https://api.github.com/repos/" + profile + "/" + repo + "/releases"
      );
      return res.json();
    }
  }
};
</script>
