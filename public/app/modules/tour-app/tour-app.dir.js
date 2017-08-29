angular.module('TourApp')
    .directive('tourDir', ['WizioConfig', function(WizioConfig) {
      return {
        templateUrl: WizioConfig.directives.tour.view,
        controller: WizioConfig.directives.tour.controller,
        scope: {
            showInterface: '=?'
        },
        restrict: 'EA'
      }
  }])
