export const state = () => ({
  dailyBlocks: false
})

export const mutations = {
  setDailyBlocks(state, dailyBlocksObj) {
    state.dailyBlocks = dailyBlocksObj
  }
}

export const getters = {
  getDailyBlocks(state) {
    return state.dailyBlocks
  }
}

export const actions = {
  async getDailyBlocks({ commit }) {
    const data = await this.$axios.$get(
      'https://api.nknx.org/statistics/daily/blocks'
    )
    commit('setDailyBlocks', data)
  }
}
