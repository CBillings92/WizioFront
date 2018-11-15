angular.module("MarketApp").controller("MarketLandingPageCtrl", [
  "$scope",
  "$state",
  "$q",
  "MarketFct",
  function($scope, $state, $q, MarketFct) {
    $scope.dataLoaded = false;
    $scope.marketSearch = {
      agentId: $state.params.agentid
    };

    $scope.submitMarketSearch = function() {
      return $q(function(resolve, reject) {
        $scope.searchInProgress = true;

        MarketFct.addDataToLocalStore(
          "wizio",
          "lastMarketSearchCriteria",
          $scope.marketSearch
        );

        MarketFct.submitMarketSearch($scope.marketSearch)
          .then(function(response) {
            $scope.dataLoaded = true;
            MarketFct.addDataToLocalStore(
              "wizio",
              "listings",
              response.payload
            );
            $state.go("SearchMarket", { area: "Jamaica-Plain" });
          })
          .catch(function(err) {
            console.error(err);
          });
      });
    };
  }
]);
