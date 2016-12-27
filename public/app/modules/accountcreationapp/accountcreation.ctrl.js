angular.module('AccountApp')
    .controller('AccountCreationFormCtrl', [
        '$scope',
        function($scope) {
            //test
            function submit() {
                if($scope.password === $scope.passwordConfirm){

                } else {
                    alert('Password does not match!')
                }
            }
        }
    ])
