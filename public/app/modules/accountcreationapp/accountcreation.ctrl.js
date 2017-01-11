angular.module('AccountApp')
    .controller('AccountCreationFormCtrl', [
        '$scope',
        '$state',
        function($scope, $state) {
            //test
            $scope.signupInvite = $state.current.name === "Signup.Invite" ? true : false;
            function submit() {
                if ($scope.password === $scope.passwordConfirm) {

                } else {
                    alert('Password does not match!');
                }
            }
        }
    ]);
