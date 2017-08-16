angular.module('TourApp')
    .directive('tourDir', ['WizioConfig', function(WizioConfig) {
      return {
        templateUrl: WizioConfig.directives.newTour.view,
        controller: WizioConfig.directives.newTour.controller,
        scope: {
            showInterface: '=?'
        },
        restrict: 'EA'
      }
  }])
