export const state = () => ({
  userNodes: false,
  userConfig: {
    filter: '',
    sort: '',
    order: 'desc',
    search: '',
    page: 1
  }
})

export const mutations = {
  setUserNodes(state, userNodesObj) {
    state.userNodes = userNodesObj
  },
  setUserConfig(state, userConfigObj) {
    state.userConfig = userConfigObj
  }
}

export const getters = {
  getUserNodes(state) {
    return state.userNodes
  },
  getUserConfig(state) {
    return state.userConfig
  }
}

export const actions = {
  async updateUserNodes({ commit }) {
    const {
      page,
      filter,
      sort,
      order,
      search
    } = this.state.userNodes.userConfig
    const data = await this.$axios.$get(
      `nodes?page=${page}&syncState=${filter}&orderBy=${sort}&order=${order}&search=${search}`
    )
    commit('setUserNodes', data)
  },
  updateUserConfig({ commit }, config) {
    commit('setUserConfig', config)
  }
}
