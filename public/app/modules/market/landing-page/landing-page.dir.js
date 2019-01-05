angular.module("MarketApp").directive("marketLandingPageDir", [
  "WizioConfig",
  function(WizioConfig) {
    return {
      templateUrl: WizioConfig.pages.Market.LandingPage.View,
      controller: WizioConfig.pages.Market.LandingPage.Ctrl,
      scope: {},
      restrict: "EA"
    };
  }
]);
