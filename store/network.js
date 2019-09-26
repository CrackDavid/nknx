export const state = () => ({
  networkStats: false,
  networkStatus: false,
  networkCities: false,
  networkCountries: false,
  networkProviders: false,
  networkReleases: false
})

export const mutations = {
  setNetworkStats(state, networkStatsObj) {
    state.networkStats = networkStatsObj
  },
  setNetworkStatus(state, networkStatusObj) {
    state.networkStatus = networkStatusObj
  },
  setNetworkCities(state, citiesObj) {
    state.networkCities = citiesObj
  },
  setNetworkCountries(state, countriesObj) {
    state.networkCountries = countriesObj
  },
  setNetworkProviders(state, providersObj) {
    state.networkProviders = providersObj
  },
  setNetworkReleases(state, releasesObj) {
    state.networkReleases = releasesObj
  }
}

export const getters = {
  getNetworkStats(state) {
    return state.networkStats
  },
  getNetworkStatus(state) {
    return state.networkStatus
  },
  getNetworkCities(state) {
    return state.networkCities
  },
  getNetworkCountries(state) {
    return state.networkCountries
  },
  getNetworkProviders(state) {
    return state.networkProviders
  },
  getNetworkReleases(state) {
    return state.networkReleases
  }
}

export const actions = {
  async updateNetworkStats({ commit }) {
    const data = await this.$axios.$get('network/stats')
    commit('setNetworkStats', data)
  },
  async updateNetworkStatus({ commit }) {
    const data = await this.$axios.$get('network/status')
    commit('setNetworkStatus', data)
  },
  async updateNetworkCities({ commit }) {
    const data = await this.$axios.$get('network/cities')
    commit('setNetworkCities', data)
  },
  async updateNetworkCountries({ commit }) {
    const data = await this.$axios.$get(
      'network/countries'
    )
    commit('setNetworkCountries', data)
  },
  async updateNetworkProviders({ commit }) {
    const data = await this.$axios.$get('network/isps')
    commit('setNetworkProviders', data)
  },
  async updateNetworkReleases({ commit }) {
    let data = await fetch('https://api.github.com/repos/nknorg/nkn/releases')
    data = await data.json()
    data = data.slice(0, 3)
    data.forEach(item => {
      item.body = item.body.replace(/\n/gi, '')
      item.body = item.body.replace(/\*/g, '')
    })
    commit('setNetworkReleases', data)
  }
}
