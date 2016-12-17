angular.module('AccountApp')
    .controller('SubscriptionMainCtrl', ['$scope', function($scope) {
        alert('hello');
        $scope.test = function(){
            console.dir('test');
        }
        $scope.submit = function(){
            console.dir($scope.user);
        }
    }])
