angular.module('AccountApp')
    .controller('AuthResetPassCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$localStorage',
        '$stateParams',
        '$location',
        'ModalSvc',
        'AuthFct',
        'AuthResetPasswordResource',
        'AuthUpdatePasswordResource',
        'TokenSvc',
        'RerouteGetSetSvc',
        'WizioConfig',
        'ModalBuilderFct',
        function($rootScope, $scope, $state, $localStorage, $stateParams, $location, ModalSvc, AuthFct, AuthResetPasswordResource, AuthUpdatePasswordResource, TokenSvc, RerouteGetSetSvc, WizioConfig, ModalBuilderFct) {

            var authViews = WizioConfig.AccountAuthViewsURL;
            $scope.emailobj = {};
            //shorthand - just so we don't need to keep typing this long crap
            $scope.sendResetEmail = function() {
                AuthResetPasswordResource.save($scope.emailobj, function(responseObj) {
                    //generate modals for either error or successful reset password email
                    return AuthFct.resetEmailResponseHandler(responseObj, $scope.emailobj.email);
                });
            };
            //on modal close
            $scope.closeModal = function() {
                $uibModalInstance.close();
            };
            //______________________________________________________________________________
            //FOR RESETING EMAIL - Goes with resetPassword.html
            var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');
            $scope.resetPassword = function() {
                $scope.passwordObj = {};
                var passwordsMatch;
                //check to make sure the password matches
                passwordsMatch = AuthFct.confirmPasswords($scope.passwordObj.password, $scope.passwordObj.passwordConfirm);

                if (passwordsMatch) {
                    var passwordobj = {
                        password: $scope.password,
                        token: $stateParams.token
                    };
                    AuthUpdatePasswordResource.save(passwordobj, function(responseObj) {
                        if (responseObj.status !== "ERR") {
                            ModalBuilderFct.buildSimpleModal(
                                'Close',
                                'OK',
                                'Password Updated',
                                'You have successful updated the password for your account!'
                            ).then(function(result) {
                                return $state.go('LandingPage');
                            });
                        } else {
                            ModalBuilderFct.buildSimpleModal(
                                'Close',
                                'OK',
                                'Password Update Error',
                                'We could not update your password at this time. Please try again later'
                            ).then(function(result) {
                                return;
                            });
                        }
                        return;
                    });
                } else {
                    $scope.password = '';
                    $scope.passwordConfirm = '';
                    ModalBuilderFct.buildSimpleModal(
                        'Close',
                        'OK',
                        'Passwords do not match',
                        'The two passwords you have provided do not match. Please try again'
                    ).then(function(result) {
                        return;
                    });
                }
            };
            $scope.requestLogin = function() {
                var userData = {
                    email: $scope.email,
                    password: $scope.password
                };
                AuthFct.signin(userData)
                    .then(function(result) {
                        ModalSvc.showModal(modalDefaultsLogin, {})
                            .then(function(result) {
                                return;
                            });
                    })
                    .catch(function(result) {
                        return $uibModalInstance.close('ok');
                    });
            };
        }
    ]);
