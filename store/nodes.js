export const state = () => ({
  dailyNodes: false
})

export const mutations = {
  setDailyNodes(state, dailyNodesObj) {
    state.dailyNodes = dailyNodesObj
  }
}

export const getters = {
  getDailyNodes(state) {
    return state.dailyNodes
  }
}

export const actions = {
  async updateDailyNodes({ commit }) {
    const data = await this.$axios.$get(
      'statistics/daily/nodes'
    )
    commit('setDailyNodes', data)
  }
}
