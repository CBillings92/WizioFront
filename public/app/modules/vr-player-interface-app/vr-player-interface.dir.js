angular.module('VrPlayerInterfaceApp')
    .directive('vrPlayerInterfaceDir', ['WizioConfig', function(WizioConfig) {
      return {
        templateUrl: WizioConfig.directives.vrPlayerInterface.view,
        controller: WizioConfig.directives.vrPlayerInterface.controller,
        scope: {},
        restrict: 'EA'
      }
  }])
