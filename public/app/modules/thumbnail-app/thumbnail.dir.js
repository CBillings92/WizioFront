angular.module('ThumbnailApp').directive('thumbnailDir', [
  'WizioConfig',
  function(WizioConfig) {
    return {
      templateUrl: WizioConfig.directives.ThumbnailApp.main.view,
      controller: 'ThumbnailCtrl',
      scope: {
        'thumbnailObj': 'thumbnailObj'
      },
      restrict: 'EA'
    }
  }
])
