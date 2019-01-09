angular.module("MarketApp").factory("MarketFct", [
  "$q",
  "$resource",
  "$state",
  "WizioConfig",
  "lodash",
  function($q, $resource, $state, WizioConfig, lodash) {
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

    function recordFilterListingsEvent(
      filterType,
      filteredListings,
      filterValue
    ) {
      return $q(function(resolve, reject) {
        var marketSearchId = getLocalStorageData("wizio").MarketSearch
          .MarketSearchId;
        $resource(WizioConfig.baseAPIURL + "marketfilter").save(
          {
            filterType: filterType,
            filteredListings: filteredListings,
            filterValue: filterValue,
            marketSearchId: marketSearchId
          },
          function(response) {
            return resolve(response);
          }
        );
      });
    }

    // function orderListings(listings, orderType, firstRankItem){
    //   var options = ['Studio', '1+ Bed', '2+ Bed', '3+ Bed', '4+ Bed']
    //   var rank = {}
    //   var rankCount = 1
    //   for(var i = 1; i <= options.length; i++){
    //     if(options[i] === firstRankItem){
    //       rank[options[i]] = rankCount
    //       rankCount++
    //     }
    //   }
    //   lodash.sortBy(listings, function(element){

    //   })
    // }

    return {
      submitMarketSearch: submitMarketSearch,
      addDataToLocalStore: addDataToLocalStore,
      getLocalStorageData: getLocalStorageData,
      updateLocalStorage: updateLocalStorage,
      initMarketData: initMarketData,
      recordFilterListingsEvent: recordFilterListingsEvent
    };
  }
]);
