export const state = () => ({
  userNodes: false
})

export const mutations = {
  setUserNodes(state, userNodesObj) {
    state.userNodes = userNodesObj
  }
}

export const getters = {
  getUserNodes(state) {
    return state.userNodes
  }
}

export const actions = {
  async updateUserNodes({ commit }, config) {
    const { page, filter, sort, order, search } = config
    const data = await this.$axios.$get(
      `nodes?page=${page}&syncState=${filter}&orderBy=${sort}&order=${order}&search=${search}`
    )
    commit('setUserNodes', data)
  }
}
