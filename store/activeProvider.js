export const state = () => ({
  activeProvider: false
})

export const mutations = {
  setActiveProvider(state, activeProviderObj) {
    state.activeProvider = activeProviderObj
  }
}

export const getters = {
  getActiveProvider(state) {
    return state.activeProvider
  }
}

export const actions = {
  updateActiveProvider({ commit }, vps) {
    commit('setActiveProvider', vps)
  }
}
