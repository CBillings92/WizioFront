/*
    Landing Page main controller - at www.wizio.co/
*/
angular.module("LandingPageApp").controller("LandingPageCtrl", [
  "$scope",
  "$state",
  function($scope, $state) {
    $scope.goToDashboard = function() {
      $state.go("Account.Dashboard");
    };

    $scope.goToProduct = function() {
      $state.go("Product");
    };

    $scope.openPopUp = function() {
      console.log("clicked");
      require(["mojo/signup-forms/Loader"], function(L) {
        L.start({ baseUrl: "mc.us10.list-manage.com", uuid: "dd1716a846e7e35a09a1562a9", lid: "973bf1b4ca" });
      });
    };
  }
]);
