angular.module("MarketApp").factory("MarketFct", [
  "$q",
  "$resource",
  "$state",
  "WizioConfig",
  function($q, $resource, $state, WizioConfig) {
    function submitMarketSearch(marketSearch) {
      return $q(function(resolve, reject) {
        console.dir("HELLO IN SUBMIT SEARCH");
        console.dir(marketSearch);
        if (!marketSearch.AddressBar || marketSearch.AddressBar === "") {
          marketSearch.AddressBar = "Boston, MA";
        }

        $resource(WizioConfig.baseAPIURL + "marketsearch").save(
          marketSearch,
          function(response) {
            console.dir(response);
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
          marketSearch: { AddressBar: "", searchTime: new Date("2015-01-01") },
          visitor: {},
          listings: []
        };
        var wizioLocalStore = getLocalStorageData("wizio") || {};
        if (
          wizioLocalStore === {} ||
          !wizioLocalStore.hasOwnProperty("marketSearch") ||
          !wizioLocalStore.hasOwnProperty("listings")
        ) {
          alert("update to default wizio local store");
          updateLocalStorage("wizio", defaultWizioLocalStore);
        }
        wizioLocalStore = getLocalStorageData("wizio");
        var searchArea = wizioLocalStore.marketSearch.AddressBar;
        var searchTime = wizioLocalStore.marketSearch.searchTime;
        var urlSearchArea = stateParamsArea || $state.params.area || "";
        console.dir("searchArea = " + searchArea);
        console.dir("searchTime = " + searchTime);
        console.dir("urlSearchArea = " + urlSearchArea);
        if (
          searchArea === "" ||
          searchArea !== $state.params.area ||
          (new Date() - searchTime) / 1000 >= 60 * 5
        ) {
          alert("Market Search Deemed Old");
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
