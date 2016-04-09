angular.module('AccountApp')
    .controller('AuthLoginModalCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$localStorage',
        '$stateParams',
        '$facebook',
        '$location',
        '$uibModalInstance',
        'ModalSvc',
        'AuthFct',
        'AuthResetPasswordResource',
        'AuthUpdatePasswordResource',
        'TokenSvc',
        'RerouteGetSetSvc',
        'WizioConfig',
        function($rootScope, $scope, $state, $localStorage, $stateParams, $facebook, $location, $uibModalInstance, ModalSvc, AuthFct, AuthResetPasswordResource, AuthUpdatePasswordResource, TokenSvc, RerouteGetSetSvc, WizioConfig) {
            var modalDefaults = function(templateUrl, controller, accountType) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: templateUrl,
                    controller: controller,
                    resolve: {
                        data: function() {
                            return accountType;
                        }
                    }
                };
            };
            var authViews = WizioConfig.AccountAuthViewsURL;

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
                AuthFct.signin(userData,
                    function(res) {
                        $rootScope.isLoggedIn = true;
                        $rootScope.userType = TokenSvc.decode().userType;
                        return $uibModalInstance.close('ok');

                    },
                    function() {
                        $rootScope.error = "Failed to sign in!";
                        $scope.email = "";
                        $scope.password = "";
                        // ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                        //     return;
                        // });
                    });
            };

        }
    ]);
