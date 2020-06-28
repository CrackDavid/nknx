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
  async updateDailyTransactions({ commit }) {
    const data = await this.$axios.$get(
      'https://openapi.nkn.org/api/v1/statistics/daily/transactions'
    )
    commit('setDailyTransactions', data)
  }
}
