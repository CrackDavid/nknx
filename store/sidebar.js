export const state = () => ({
  sidebarExpanded: false
});

export const mutations = {
  set(state) {
    state.sidebarExpanded = !state.sidebarExpanded;
  }
};

export const getters = {
  get(state) {
    return state.sidebarExpanded;
  }
};

export const actions = {
  toggleSidebar({ commit }) {
    commit("set");
  }
};
