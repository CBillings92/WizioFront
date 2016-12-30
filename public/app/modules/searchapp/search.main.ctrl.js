angular.module('SearchApp')
    .controller('SearchAppCtrl', [
      '$stateParams',
      '$sessionStorage',
      '$scope',
      function($stateParams, $sessionStorage, $scope) {
    //   console.dir($scope.apartments);
    //   $scope.apartments = [
    //       {
    //           street: '175 Amory Street'
    //       },
    //       {
    //           street: '193 Chelsea Ave'
    //       }
    //   ]
     $scope.apartments = $stateParams.apartments;
     $sessionStorage.apartmentSearch = $stateParams.apartments;
     console.log($scope.apartments);

    }])
