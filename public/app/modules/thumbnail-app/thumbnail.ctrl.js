angular.module('ThumbnailApp')
  .controller('ThumbnailCtrl', [
    '$scope',
    'ThumbnailFct',
    function($scope, ThumbnailFct){
      /* $scope.thumbnailObj contains thumbnail data */

      if ($scope.thumbnailObj.url) {
        ThumbnailFct.unwarpThumbnail($scope.thumbnailObj.url);
      } else if ($scope.thumbnailObj.file) {

      } else {

      }
    }
  ])
