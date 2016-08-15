angular.module('AccountApp')
    .controller('PaymentManagerCtrl', ['$scope', function($scope) {
        //get user plan
        $scope.plan = 'Premium';
        $scope.costPerMonth = 99.00;



    }]);
