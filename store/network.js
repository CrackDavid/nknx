export const state = () => ({
  networkStatus: false,
  networkNodes: false
});

export const mutations = {
  setNetworkStatus(state, networkStatusObj) {
    state.networkStatus = networkStatusObj;
  },
  setNetworkNodes(state, networkNodesObj) {
    state.networkNodes = networkNodesObj;
  }
};

export const getters = {
  getNetworkStatus(state) {
    return state.networkStatus;
  },
  getNetworkNodes(state) {
    return state.networkNodes;
  }
};

export const actions = {
  async getCurrentNetworkStatus({ commit }) {
    const data = await this.$axios.$get(
      "https://api.nknx.org/statistics/network"
    );
    commit("setNetworkStatus", data);
  },
  async getCurrentNetworkNodes({ commit }) {
    await this.$axios
      .$get("https://api.nknx.org/crawledNodes?withLocation=true")
      .then(function(nodeList) {
        const countryList = {};
        const providerList = {};
        nodeList.forEach(function(node) {
          // Getting countries
          const countryName = node.country_name;
          if (countryList.hasOwnProperty(countryName)) {
            countryList[countryName]++;
          } else {
            countryList[countryName] = 1;
          }

          // Getting providers
          const provider = node.organization;
          if (providerList.hasOwnProperty(provider)) {
            providerList[provider]++;
          } else {
            providerList[provider] = 1;
          }
        });
        const networkNodes = {
          stats: {
            totalNodes: nodeList.length,
            totalCountries: Object.keys(countryList).length,
            totalProviders: Object.keys(providerList).length
          },
          nodes: nodeList,
          countries: countryList,
          providers: providerList
        };
        commit("setNetworkNodes", networkNodes);
      });
  }
};
