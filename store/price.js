export const state = () => ({
  currentPrice: false,
  dailyHistoryPrice: false
})

export const mutations = {
  setCurrentPrice(state, priceObj) {
    state.currentPrice = priceObj
  },
  setDailyHistoryPrice(state, priceObj) {
    state.dailyHistoryPrice = priceObj
  }
}

export const getters = {
  getCurrentPrice(state) {
    return state.currentPrice
  },
  getDailyHistoryPrice(state) {
    return state.dailyHistoryPrice
  }
}

export const actions = {
  async updateCurrentPrice({ commit }) {
    const data = await this.$axios.$get(
      'https://price.nknx.org/price?quote=NKN&currency=USD,ETH'
    )
    commit('setCurrentPrice', data[0])
  },
  async updateDailyHistoryPrice({ commit }) {
    const data = await this.$axios.$get(
      'https://price.nknx.org/history?quote=NKN&currency=USD,ETH&aggregate=days'
    )
    commit('setDailyHistoryPrice', data[0])
  }
}
