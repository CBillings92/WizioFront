angular.module('TourPanelApp')
    .directive('tourPanelDir', ['WizioConfig', function(WizioConfig) {
      return {
        templateUrl: WizioConfig.directives.tourPanel.view,
        controller: WizioConfig.directives.tourPanel.controller,
        scope: {
            'tour': '='
        },
        restrict: 'EA'
      }
  }])
