angular.module('AccountApp')
    .controller('AuthLoginModalCtrl', [
        '$scope',
        '$state',
        '$uibModalInstance',
        '$q',
        'AuthFct',
        'WizioConfig',
        function($scope, $state,$uibModalInstance, $q, AuthFct, WizioConfig) {
            $scope.changePassword = false;
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };

            $scope.forgotPassword = function() {
                console.dir('hi');
                $scope.changePassword = true;
                // $state.go('SendResetEmail');
                // return $uibModalInstance.close('ok');
            };

            $scope.requestLogin = function() {
                var userData = {
                    email: $scope.email,
                    password: $scope.password
                };
                AuthFct.signin(userData)
                    .then(function(result) {

                        return $uibModalInstance.close('ok');
                    })
                    .catch(function(result) {
                        $scope.password = '';
                    });
            };

        }
    ]);
