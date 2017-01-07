angular.module('AccountApp')
    .directive('loadingSpinnerDir', function() {
      return {
        templateUrl: 'public/app/modules/loading-spinner-app/loading-spinner.view.html',
        controller: 'LoadingSpinnerCtrl',
        scope: {},
        restrict: 'EA'
      }
    })
