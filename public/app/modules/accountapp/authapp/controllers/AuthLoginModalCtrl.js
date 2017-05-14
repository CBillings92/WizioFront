angular.module('AccountApp')
    .controller('AuthLoginModalCtrl', [
        '$scope',
        '$state',
        '$uibModalInstance',
        '$q',
        'AuthFct',
        'WizioConfig',
        '$rootScope',
        'ModalBuilderFct',
        function($scope, $state,$uibModalInstance, $q, AuthFct, WizioConfig, $rootScope, ModalBuilderFct) {
            $scope.changePassword = false;
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };

            $scope.forgotPassword = function() {
                $scope.changePassword = true;
                // $state.go('SendResetEmail');

            };


            $rootScope.$on('unauthorized', function() {
                ModalBuilderFct.buildSimpleModal(
                    "",
                    "OK",
                    "Login Failed",
                    'Please check your username and password.'
                ).then(function(result) {
                    return;
                });
            });

            $scope.requestLogin = function() {
                var userData = {
                    email: $scope.email,
                    password: $scope.password
                };
                AuthFct.signin(userData)
                    .then(function(result) {
                        if(result === 'failed'){
                          return;
                        } else {
                          $state.go('Account.Dashboard');
                          return $uibModalInstance.close('ok');
                        }
                    })
                    .catch(function(result) {
                        $scope.password = '';
                    });
            };

        }
    ]);
