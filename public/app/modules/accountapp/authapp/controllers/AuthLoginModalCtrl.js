angular.module('AccountApp')
    .controller('AuthLoginModalCtrl', [
        '$scope',
        '$state',
        '$uibModalInstance',
        '$q',
        'AuthFct',
        'WizioConfig',
        function($scope, $state,$uibModalInstance, $q, AuthFct, WizioConfig) {
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };

            $scope.forgotPassword = function() {
                $state.go('SendResetEmail');
                return $uibModalInstance.close('ok');
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
