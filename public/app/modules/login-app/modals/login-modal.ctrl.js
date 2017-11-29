/*
    Login modal controller.
*/
angular.module('LoginApp')
    .controller('LoginModalCtrl', [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        '$state',
        'LoginFct',
        'ModalBuilderFct',
        function ($scope, $uibModalInstance, $rootScope, $state, LoginFct, ModalBuilderFct) {
            var loginData = {};
            // Display change password form on modal - default is false
            $scope.changePasswordFlag = false;
            $scope.forgotPassword = function () {
                $scope.changePasswordFlag = !$scope.changePasswordFlag;
            }

            // Close modal with 'x' on top right of modal - a directive
            $scope.closeModal = function () {
                $uibModalInstance.close();
            };

            // Upon a bad login/authentication request - based on HTTP status returned - in routes file
            $rootScope.$on('unauthorized', function () {
                ModalBuilderFct.buildSimpleModal(
                    "",
                    "OK",
                    "Error",
                    'Please try entering your username and password again'
                ).then(function(result) {
                    return;
                });
            });

            $scope.requestLogin = function () {
                loginData.email = $scope.email;
                loginData.password = $scope.password;
                LoginFct.requestLogin(loginData)
                .then(function(result){
                    $state.go('Account.Dashboard');
                    return $uibModalInstance.close('ok');
                })
                .catch(function (error) {
                    ModalBuilderFct.buildSimpleModal(
                      "",
                      "OK",
                      "Login Failed",
                      "Incorrect email or password. Please try entering your email and password again."
                    )
                    $scope.password = '';
                });
            };

        }
    ])
