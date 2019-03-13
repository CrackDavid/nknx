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
      "https://api2.nknx.org/statistics/network"
    );
    commit("setNetworkStatus", data);
  },
  async getCurrentNetworkNodes({ commit }) {
    await this.$axios
      .$get("https://api2.nknx.org/crawledNodes?withLocation=true")
      .then(function(nodeList) {
        const countryList = [];
        const countryListTemp = nodeList.reduce(function(rv, x) {
          (rv[x["country_name"]] = rv[x["country_name"]] || []).push(x);
          return rv;
        }, {});
        for (var propertyNameCountry in countryListTemp) {
          countryList.push({
            country: propertyNameCountry,
            count: countryListTemp[propertyNameCountry].length
          });
        }

        // Getting providers
        const providerList = [];
        const providerListTemp = nodeList.reduce(function(rv, x) {
          (rv[x["organization"]] = rv[x["organization"]] || []).push(x);
          return rv;
        }, {});

        for (var propertyNameProvider in providerListTemp) {
          providerList.push({
            provider: propertyNameProvider,
            count: providerListTemp[propertyNameProvider].length
          });
        }

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
