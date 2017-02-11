angular.module('AccountApp')
    .directive('floorPlanUploadFormDir', function() {
      return {
        templateUrl: 'public/app/modules/photographerapp/floorplanupload/floorplanupload.view.html',
        controller: 'FloorPlanUploadCtrl',
        scope: {},
        restrict: 'EA'
      }
    })
