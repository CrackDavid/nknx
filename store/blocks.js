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
  async updateDailyBlocks({ commit }) {
    const data = await this.$axios.$get(
      'blocks'
    )
    commit('setDailyBlocks', data)
  }
}
