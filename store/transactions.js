export const state = () => ({
  dailyTransactions: false
})

export const mutations = {
  setDailyTransactions(state, dailyTransactionsObj) {
    state.dailyTransactions = dailyTransactionsObj
  }
}

export const getters = {
  getDailyTransactions(state) {
    return state.dailyTransactions
  }
}

export const actions = {
  async getDailyTransactions({ commit }) {
    const data = await this.$axios.$get(
      'https://api.nknx.org/statistics/daily/transactions'
    )
    commit('setDailyTransactions', data)
  }
}
