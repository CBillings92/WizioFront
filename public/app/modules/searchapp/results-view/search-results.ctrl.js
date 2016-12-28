angular.module('SearchApp')
    .controller('SearchResultsListCtrl', [
      '$scope',
      function($scope) {
      console.dir($scope.apartments);
      $scope.apartments = [
          {
              street: '175 Amory Street'
          },
          {
              street: '193 Chelsea Ave'
          }
      ]
    }])
