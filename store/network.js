export const state = () => ({
  networkStats: false,
  networkStatus: false,
  networkCities: false,
  networkCountries: false
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
  }
}

export const actions = {
  async updateNetworkStats({ commit }) {
    const data = await this.$axios.$get('https://api2.nknx.org/network/stats')
    commit('setNetworkStats', data)
  },
  async updateNetworkStatus({ commit }) {
    const data = await this.$axios.$get('https://api2.nknx.org/network/status')
    commit('setNetworkStatus', data)
  },
  async updateNetworkCities({ commit }) {
    const data = await this.$axios.$get('https://api2.nknx.org/network/cities')
    commit('setNetworkCities', data)
  },
  async updateNetworkCountries({ commit }) {
    const data = await this.$axios.$get(
      'https://api2.nknx.org/network/countries'
    )
    commit('setNetworkCountries', data)
  }
}
