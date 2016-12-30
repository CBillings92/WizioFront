angular.module('SearchApp')
    .controller('SearchResultsListCtrl', [
      '$scope',
      '$sessionStorage',
      function($scope, $sessionStorage) {
          $scope.apartments = $sessionStorage.apartmentSearch;
      console.dir($scope.apartments);
      console.log("hello kevin");
    //   $scope.apartments = [
    //       {
    //           street: '175 Amory Street'
    //       },
    //       {
    //           street: '193 Chelsea Ave'
    //       }
    //   ]
    }])
