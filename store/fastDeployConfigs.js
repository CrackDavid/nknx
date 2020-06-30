export const state = () => ({
  nodeCounter: 0,
  fastDeployConfigs: false,
  activeFastDeployConfig: {
    id: 0
  }
})

export const mutations = {
  setFastDeployConfigs(state, fastDeployConfigsObj) {
    state.fastDeployConfigs = fastDeployConfigsObj
  },
  setActiveFastDeployConfig(state, fastDeployConfigsObj) {
    state.activeFastDeployConfig = fastDeployConfigsObj
  },
  setNodeCounter(state, num) {
    state.nodeCounter = num
  }
}

export const getters = {
  getFastDeployConfigs(state) {
    return state.fastDeployConfigs
  },
  getActiveFastDeployConfig(state) {
    return state.activeFastDeployConfig
  },
  getNodeCounter(state) {
    return state.nodeCounter
  }
}

export const actions = {
  async updateFastDeployConfigs({ commit }, page) {
    const data = await this.$axios.$get(
      `fast-deploy/configurations/?page=${page}`
    )
    commit('setFastDeployConfigs', data)
  },
  updateActiveFastDeployConfig({ commit }, config) {
    commit('setActiveFastDeployConfig', config)
  },
  updateNodeCounter({ commit }, num) {
    commit('setNodeCounter', num)
  }
}
