export const state = () => ({
  networkStatus: {},
  networkNodes: {}
})

export const mutations = {
  setNetworkStatus(state, networkStatusObj) {
    state.networkStatus = networkStatusObj
  },
  setNetworkNodes(state, networkNodesObj) {
    state.networkNodes = networkNodesObj
  }
}

export const getters = {
  getNetworkStatus(state) {
    return state.networkStatus
  },
  getNetworkNodes(state) {
    return state.networkNodes
  }
}

export const actions = {
  async getCurrentNetworkStatus({ commit }) {
    const data = await this.$axios.$get(
      'https://api.nknx.org/statistics/network'
    )
    commit('setNetworkStatus', data)
  },
  async getCurrentNetworkNodes({ commit }) {
    const data = await this.$axios.$get(
      'https://api.nknx.org/crawledNodes?withLocation=true'
    )
    commit('setNetworkNodes', data)
  }
}
