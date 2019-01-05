angular.module("MarketApp").factory("MarketFct", [
  "$q",
  "$resource",
  "$state",
  "WizioConfig",
  function($q, $resource, $state, WizioConfig) {
    function submitMarketSearch(marketSearch) {
      return $q(function(resolve, reject) {
        if (!marketSearch.AddressBar || marketSearch.AddressBar === "") {
          marketSearch.AddressBar = "Boston, MA";
        }

        $resource(WizioConfig.baseAPIURL + "marketsearch").save(
          marketSearch,
          function(response) {
            if (response.success) {
              updateLocalStorage("wizio", response.payload);
              return resolve(response);
            } else {
              alert(response.message);
              return reject(response);
            }
          }
        );
      });
    }

    function updateLocalStorage(key, data) {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }

      localStorage.setItem(key, JSON.stringify(data));
      return;
    }

    function getLocalStorageData(key) {
      return JSON.parse(localStorage.getItem(key));
    }

    function addDataToLocalStore(localStoreKey, newDataKey, newData) {
      if (!localStorage.getItem(localStoreKey)) {
        localStorage.setItem(localStoreKey, JSON.stringify({}));
      }
      var localStore = JSON.parse(localStorage.getItem(localStoreKey));
      localStore[newDataKey] = newData;
      localStorage.setItem(localStoreKey, JSON.stringify(localStore));
      return;
    }

    function initMarketData(stateParamsArea) {
      return $q(function(resolve, reject) {
        // Set default searchTime at least 5 minutes into the past if it doesn't exist
        // This will trigger a new search to happen
        var defaultWizioLocalStore = {
          MarketSearch: { AddressBar: "", searchTime: new Date("2015-01-01") },
          visitor: {},
          listings: []
        };
        var wizioLocalStore = getLocalStorageData("wizio") || {};
        if (
          wizioLocalStore === {} ||
          !wizioLocalStore.hasOwnProperty("MarketSearch") ||
          !wizioLocalStore.hasOwnProperty("listings")
        ) {
          updateLocalStorage("wizio", defaultWizioLocalStore);
        }
        wizioLocalStore = getLocalStorageData("wizio");
        var searchArea = wizioLocalStore.MarketSearch.AddressBar;
        var searchTime = wizioLocalStore.MarketSearch.searchTime;
        var urlSearchArea = stateParamsArea || $state.params.area || "";
        if (
          searchArea === "" ||
          searchArea !== $state.params.area ||
          (new Date() - searchTime) / 1000 >= 60 * 5
        ) {
          submitMarketSearch({ AddressBar: urlSearchArea })
            .then(function(response) {
              updateLocalStorage("wizio", response.payload);
              return resolve("Success");
            })
            .catch(function(err) {
              return reject(err);
            });
        } else {
          return resolve("Success");
        }
      });
    }

    return {
      submitMarketSearch: submitMarketSearch,
      addDataToLocalStore: addDataToLocalStore,
      getLocalStorageData: getLocalStorageData,
      updateLocalStorage: updateLocalStorage,
      initMarketData: initMarketData
    };
  }
]);
