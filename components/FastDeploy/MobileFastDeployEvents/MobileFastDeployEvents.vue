<template>
  <Card col="12" padding="none">
    <div class="card-header card-header_padding">
      <h3 class="card-header__title">
        {{ $t('recentEvents') }}
      </h3>
      <div class="card-header__right">
        <div
          class="page-navigation__pagination page-navigation__pagination_card"
        >
          <Pagination
            :page="prevPage"
            type="prev"
            @click.native="getEvents(prevPage)"
          />
          <Pagination
            :page="nextPage"
            type="next"
            @click.native="getEvents(nextPage)"
          />
        </div>
      </div>
    </div>
    <div class="mobile-fd-event">
      <div
        v-for="event in events"
        :key="event.id"
        class="mobile-fd-event__item"
      >
        <div class="mobile-fd-event__title">{{ $t('deploymentName') }}</div>
        <div class="mobile-fd-event__value text_wrap_none">
          {{ event.fd_deployment.label }}
        </div>
        <div class="mobile-fd-event__title">
          {{ $t('server') }}
        </div>
        <div class="mobile-fd-event__value text_wrap_none">
          {{ event.fd_deployment.ip }}
        </div>
        <div class="mobile-fd-event__title">{{ $t('provider') }}</div>
        <div class="mobile-fd-event__value text_wrap_none">
          {{ event.fd_deployment.provider }}
        </div>
        <div class="mobile-fd-event__title">{{ $t('event') }}</div>
        <div class="mobile-fd-event__value text_wrap_none">
          {{ $t(`fdEvent${event.event_code}`) }}
        </div>
        <div class="mobile-fd-event__title">{{ $t('when') }}</div>
        <div class="mobile-fd-event__value text_wrap_none">
          {{ $moment(event.created_at).format('MMM Do, hh:MM:SS A') }}
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './MobileFastDeployEvents.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: {
    Card,
    Pagination
  },
  data: () => {
    return {
      nextPage: null,
      prevPage: null,
      current_page: 1,
      from: 0,
      to: 0,
      loading: false,
      events: []
    }
  },
  mounted() {
    this.getEvents(1)
    this.intervalEvents = setInterval(this.getEvents, 30000)
  },
  destroyed() {
    clearInterval(this.intervalEvents)
  },
  methods: {
    parseEventsData(response) {
      const {
        data,
        current_page,
        prev_page_url,
        next_page_url,
        from,
        to
      } = response
      this.events = data
      this.from = from
      this.to = to
      this.currentPage = current_page
      this.prevPage = prev_page_url != null ? this.currentPage - 1 : null
      this.nextPage = next_page_url != null ? this.currentPage + 1 : null
      this.loading = false
    },
    async getEvents(page) {
      const currentPage = page === undefined || page === null ? 1 : page

      this.loading = true
      // Disabling pagination untill data fetched
      this.nextPage = null
      this.prevPage = null
      const data = await this.$axios.$get(
        `fast-deploy/events?page=${currentPage}`
      )

      this.parseEventsData(data)
    }
  }
}
</script>
