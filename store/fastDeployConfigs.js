export const state = () => ({
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
  }
}

export const getters = {
  getFastDeployConfigs(state) {
    return state.fastDeployConfigs
  },
  getActiveFastDeployConfig(state) {
    return state.activeFastDeployConfig
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
  }
}
