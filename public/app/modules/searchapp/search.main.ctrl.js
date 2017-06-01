angular.module('SearchApp')
    .controller('SearchAppCtrl', [
        '$stateParams',
        '$sessionStorage',
        '$scope',
        function($stateParams, $sessionStorage, $scope) {
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

        }
    ]);
