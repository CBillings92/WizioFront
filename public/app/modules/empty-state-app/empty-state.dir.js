angular.module('EmptyStateApp')
  .directive('emptyStateDir', ['WizioConfig', function(WizioConfig) {
    return {
        templateUrl: WizioConfig.directives.emptyState.view,
        controller: WizioConfig.directives.emptyState.controller,
        restrict: 'EA'
    };
}]);
