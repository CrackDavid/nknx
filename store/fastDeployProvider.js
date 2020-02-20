export const state = () => ({
  fastDeployProvider: false
})

export const mutations = {
  setFastDeployProvider(state, fastDeployProviderObj) {
    state.fastDeployProvider = fastDeployProviderObj
  }
}

export const getters = {
  getFastDeployProvider(state) {
    return state.fastDeployProvider
  }
}

export const actions = {
  updateFastDeployProvider({ commit }, provider) {
    commit('setFastDeployProvider', provider)
  }
}
