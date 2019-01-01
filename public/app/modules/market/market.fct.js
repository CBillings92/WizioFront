angular.module("MarketApp").factory("MarketFct", [
  "$q",
  "$resource",
  "WizioConfig",
  function($q, $resource, WizioConfig) {
    function init() {
      return $q(function(resolve, reject) {
        $resource.get(WizioConfig.apiURL + "market", function(apidata) {
          var data = [
            {
              FullyFormattedAddress:
                "228 South Street Jamaica Plain MA 02130 USA",
              Neighborhood: "Jamaica Plain",
              SubscriptionApartmentId: "",
              photoTitle: "Entry",
              beds: 3,
              baths: 2
            },
            {
              FullyFormattedAddress: "360 Huntington Ave Boston MA",
              Neighborhood: "Boston",
              SubscriptionApartmentId: "",
              photoTitle: "Entry",
              beds: 2,
              baths: 1
            },
            {
              FullyFormattedAddress: "123 St. Marys St. Boston MA",
              Neighborhood: "Fenway",
              SubscriptionApartmentId: "",
              photoTitle: "Entry",
              beds: 1,
              baths: 1
            },
            {
              FullyFormattedAddress: "175 Amory St. Jamaica Plain MA 02130",
              Neighborhood: "Jamaica Plain",
              SubscriptionApartmentId: "",
              photoTitle: "Entry",
              beds: 5,
              baths: 2
            }
          ];
          return resolve(data);
        });
      });
    }

    function submitMarketSearch(marketSearch) {
      return $q(function(resolve, reject) {
        if (!marketSearch.addressBar || marketSearch.addressBar === "") {
          marketSearch.addressBar = "Boston, MA";
        }

        $resource(WizioConfig.baseAPIURL + "marketsearch").save(
          marketSearch,
          function(response) {
            console.dir(response);
            if (response.success) {
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

    return {
      init: init,
      submitMarketSearch: submitMarketSearch,
      addDataToLocalStore: addDataToLocalStore,
      getLocalStorageData: getLocalStorageData,
      updateLocalStorage: updateLocalStorage
    };
  }
]);
