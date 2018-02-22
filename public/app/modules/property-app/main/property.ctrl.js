angular.module("PropertyApp").controller("PropertyAppCtrl", [
  "$scope",
  "$state",
  "PropertyFct",
  "ModalBuilderFct",
  function($scope, $state, PropertyFct, ModalBuilderFct) {
    var initData = {};
    $scope.appData = {};

    initData.State.buildingUUID = $state.params.buildingUUID || "testmyuuid";
    PropertyFct.init(initData)
      .then(function(response) {
        $scope.appData = response;
      })
      .catch(function(err) {
        ModalBuilderFct.buildSimpleModal(
          "",
          "OK",
          "Error",
          "Could not load data for this property at this time. Please try again."
        ).then(function(result) {
          return;
        });
      });
  }
]);
