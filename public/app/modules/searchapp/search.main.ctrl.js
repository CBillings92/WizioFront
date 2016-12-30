angular.module('SearchApp')
    .controller('SearchAppCtrl', [
      '$stateParams',
      '$scope',
      function($stateParams, $scope) {
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

     console.log(apartments);

    }])
