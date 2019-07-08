export const state = () => ({
  activeNode: false
})

export const mutations = {
  setActiveNode(state, activeNodeObj) {
    state.activeNode = activeNodeObj
  }
}

export const getters = {
  getActiveNode(state) {
    return state.activeNode
  }
}

export const actions = {
  updateActiveNode({ commit }, node) {
    commit('setActiveNode', node)
  }
}
