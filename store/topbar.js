export const state = () => ({
  topbarExpanded: false
})

export const mutations = {
  setTopbar(state) {
    state.topbarExpanded = !state.topbarExpanded
  }
}

export const getters = {
  getTopbar(state) {
    return state.topbarExpanded
  }
}

export const actions = {
  toggleTopbar({ commit }) {
    commit('setTopbar')
  }
}
