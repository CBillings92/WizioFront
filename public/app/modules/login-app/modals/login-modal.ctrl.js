angular.module('LoginApp')
    .controller('LoginModalCtrl', [
        '$scope',
        '$uibModalInstance',
        '$rootScope',
        '$state',
        'LoginFct',
        function ($scope, $uibModalInstance, $rootScope, $state, LoginFct) {
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
                LoginFct.displayModal('unauthorized')
                .then(function (response) {
                    return;
                })
            });

            $scope.requestLogin = function () {
                loginData.email = $scope.email;
                loginData.password = $scope.password;
                LoginFct.requestLogin(loginData)
                .then(function(result){
                    if (result === 'failed') {
                        return;
                    } else {
                        $state.go('Account.Dashboard');
                        return $uibModalInstance.close('ok');
                    }
                })
                .catch(function (error) {
                    $scope.password = '';
                });
            };

        }
    ])
