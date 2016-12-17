angular.module('AccountApp')
    .controller('SubscriptionMainCtrl', ['$scope', function($scope) {
        alert('hello');
        $scope.testVar = 'hello';
        $scope.test = function(){
            console.dir('test');
        }
        $scope.submit = function(){
            console.dir('hi');
            var user = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            }
            console.dir(user);
        }
    }])
