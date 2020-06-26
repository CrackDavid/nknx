<template>
  <Card
    :col="
      $mq === 'xl' ? '8' : $mq === 'llg' ? '12' : $mq === 'lg' ? '12' : '12'
    "
    padding="none"
    :overflow="false"
  >
    <div class="card-header">
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
    <div>
      <table class="table">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__title">
              {{ $t('fdConfig') }}
            </th>
            <th class="table__title">
              {{ $t('server') }}
            </th>
            <th class="table__title">
              {{ $t('provider') }}
            </th>
            <th class="table__title">
              {{ $t('event') }}
            </th>
            <th class="table__title">
              {{ $t('when') }}
            </th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="event in events" :key="event.id" class="table__row">
            <td class="table__item">
              {{ event.fd_deployment.fd_configuration.label }}
            </td>
            <td class="table__item">
              {{ event.fd_deployment.ip }}
            </td>
            <td class="table__item">
              {{ event.fd_deployment.provider }}
            </td>
            <td class="table__item">
              {{ $t(event.event_code) }}
            </td>
            <td class="table__item">
              {{ $moment(event.created_at).format('MMM Do, hh:MM:SS A') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>

<style lang="scss">
@import './FastDeployEvents.scss';
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
    this.intervalNetworkStats = setInterval(
      this.getEvents(this.current_page),
      10000
    )
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
      // Checking if page exists
      if (page === null) {
        return false
      }
      this.loading = true
      // Disabling pagination untill data fetched
      this.nextPage = null
      this.prevPage = null
      const data = await this.$axios.$get(`fast-deploy/events`)

      this.parseEventsData(data)
    }
  }
}
</script>
