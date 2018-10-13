angular.module("MarketApp").controller("MarketCtrl", [
  "$scope",
  "$q",
  "$state",
  "MarketFct",
  function($scope, $q, $state, MarketFct) {
    initMarket();

    $scope.searchInProgress = false;

    // Submit a search on the market place
    $scope.submitMarketSearch = function() {
      return $q(function(resolve, reject) {
        $scope.searchInProgress = true;
        $scope.marketSearch.agentId = $state.params.agentid;

        addDataToLocalStore(
          "wizio",
          "lastMarketSearchCriteria",
          $scope.marketSearch
        );

        MarketFct.submitMarketSearch($scope.marketSearch).then(function(
          response
        ) {
          $scope.listings = response.payload;
          addDataToLocalStore("wizio", "listings", response.payload);
        });
      });
    };

    // Navigate to a tour page
    $scope.viewTour = function(listing) {
      return $state.go("Listing", { listingUUID: listing.pubid });
    };

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
      var localStore = JSON.parse(localStorage.getItem(localStoreKey));
      localStore[newDataKey] = newData;
      localStorage.setItem(localStoreKey, JSON.stringify(localStore));
      return;
    }

    // initialize the marketplace
    function initMarket() {
      $scope.marketSearch = {};
      // MarketFct.init().then(function(listings) {
      //   $scope.listings = listings;
      // });

      if (!getLocalStorageData("wizio")) {
        updateLocalStorage("wizio", { listings: [] });
      }
      var storedListings = getLocalStorageData("wizio").listings;
      var lastMarketSearchCriteria = getLocalStorageData("wizio")
        .lastMarketSearchCriteria;
      if (storedListings) {
        $scope.listings = storedListings;
      }

      if (lastMarketSearchCriteria) {
        $scope.marketSearch = lastMarketSearchCriteria;
      }
    }

    $scope.orderSelect = {
      price: "price"
    };
  }
]);
