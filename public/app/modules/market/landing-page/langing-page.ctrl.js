angular.module("MarketApp").controller("MarketLandingPageCtrl", [
  "$scope",
  "$state",
  "$q",
  "MarketFct",
  function($scope, $state, $q, MarketFct) {
    $scope.dataLoaded = false;
    $scope.marketSearch = {};

    $scope.submitMarketSearch = function() {
      return $q(function(resolve, reject) {
        $scope.searchInProgress = true;
        $scope.marketSearch.agentId = $state.params.agentid;

        addDataToLocalStore(
          "wizio",
          "lastMarketSearchCriteria",
          $scope.marketSearch
        );

        MarketFct.submitMarketSearch($scope.marketSearch)
          .then(function(response) {
            $scope.dataLoaded = true;
            addDataToLocalStore("wizio", "listings", response.payload);
            $state.go("SearchMarket", { area: "Jamaica-Plain" });
          })
          .catch(function(err) {
            console.error(err);
          });
      });

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
    };
  }
]);
