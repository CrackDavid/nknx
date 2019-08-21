export const state = () => ({
  pageTitle: false
})

export const mutations = {
  setPageTitle(state, pageTitleObj) {
    state.pageTitle = pageTitleObj
  }
}

export const getters = {
  getPageTitle(state) {
    return state.pageTitle
  }
}

export const actions = {
  updatePageTitle({ commit }, title) {
    commit('setPageTitle', title)
  }
}
