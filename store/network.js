import Fuse from "fuse.js";

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
        let providerList = [];
        const providerListTemp = nodeList.reduce(function(rv, x) {
          (rv[x["isp"]] = rv[x["isp"]] || []).push(x); // could switch to "isp"
          return rv;
        }, {});
        for (var propertyNameProvider in providerListTemp) {
          providerList.push({
            provider: propertyNameProvider,
            count: providerListTemp[propertyNameProvider].length
          });
        }
        let options = { keys: ["provider"], shouldSort: true, threshold: 0.3 };
        let options2 = { keys: ["provider"] };
        let fuse = new Fuse(providerList, options);
        let providerSortedList = [];
        for (let i in providerListTemp) {
          let fuse2 = new Fuse(providerSortedList, options2);
          if (!fuse2.search(i).length) {
            const searchingProvider = fuse.search(i);
            let searchingProviderCount = 0;
            searchingProvider.forEach(function(y) {
              searchingProviderCount += y.count;
            });
            providerSortedList.push({
              provider: i,
              count: searchingProviderCount
            });
          }
        }
        function sortProviderByCount(a, b) {
          if (a.count < b.count) return 1;
          if (a.count > b.count) return -1;
          return 0;
        }
        providerList = providerSortedList.sort(sortProviderByCount);
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
