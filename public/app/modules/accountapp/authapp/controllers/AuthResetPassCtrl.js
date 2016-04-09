angular.module('AccountApp')
    .controller('AuthResetPassCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$localStorage',
        '$stateParams',
        '$facebook',
        '$location',
        'ModalSvc',
        'AuthFct',
        'AuthResetPasswordResource',
        'AuthUpdatePasswordResource',
        'TokenSvc',
        'RerouteGetSetSvc',
        'WizioConfig',
        function($rootScope, $scope, $state, $localStorage, $stateParams, $facebook, $location, ModalSvc, AuthFct, AuthResetPasswordResource, AuthUpdatePasswordResource, TokenSvc, RerouteGetSetSvc, WizioConfig) {
            function modalDefaults(templateUrl, controller, accountType) {
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
            }
            //shorthand - just so we don't need to keep typing this long crap
            var authViews = WizioConfig.AccountAuthViewsURL;

            $scope.sendResetEmail = function() {
                $scope.emailobj = {};
                AuthResetPasswordResource.save($scope.emailobj, function(responseObj) {
                    if (responseObj.status === "ERR") {
                        //set the object that give the modal its default verbiage
                        var resetPasswordNotSentModalOptions = {
                            closeButtonText: "Close",
                            actionButtonText: "OK",
                            headerText: "Password Reset Error",
                            bodyText: 'We could not send an email to ' + $scope.emailobj.email + ' for some reason. Please try another email.'
                        };
                        //create a modal with the newly created object
                        ModalSvc.showModal({}, resetPasswordNotSentModalOptions)
                            .then(function(result) {});
                    } else {
                        //set the object that give the modal its default verbiage
                        var resetPasswordSentModalOptions = {
                            closeButtonText: "Close",
                            actionButtonText: "OK",
                            headerText: "Password Reset",
                            bodyText: 'An email has been sent to ' + emailobj.email + ' with instructions on how to reset your password'
                        };
                        //create a modal with the newly created object
                        ModalSvc.showModal({}, resetPasswordSentModalOptions)
                            .then(function(result) {
                                $state.go('LandingPage');
                            });
                    }
                    return;
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
                //check to make sure the password matches
                if ($scope.passwordObj.password === $scope.passwordObj.passwordConfirm) {
                    var passwordobj = {};
                    passwordobj.password = $scope.password;
                    passwordobj.token = $stateParams.token;
                    AuthUpdatePasswordResource.save(passwordobj, function(responseObj) {
                        if (responseObj.status !== "ERR") {
                            var passwordUdatedModalOptions = {
                                closeButtonText: "Close",
                                actionButtonText: "OK",
                                headerText: "Password Updated",
                                bodyText: 'You have succesfully updated the password for your account!'
                            };
                            ModalSvc.showModal({}, passwordUdatedModalOptions)
                                .then(function(result) {
                                    $state.go('LandingPage');
                                });
                        } else {
                            var passwordUdateErrorModalOptions = {
                                closeButtonText: "Close",
                                actionButtonText: "OK",
                                headerText: "Password Update Error",
                                bodyText: 'We coult not update your password for some reason. Please try again.'
                            };
                            ModalSvc.showModal({}, passwordUdateErrorModalOptions)
                                .then(function(result) {});
                        }
                        return;
                    });
                } else {
                    $scope.password = '';
                    $scope.passwordConfirm = '';
                    var passwordMatchErrorModalOptions = {
                        closeButtonText: "Close",
                        actionButtonText: "OK",
                        headerText: "Password do not match error",
                        bodyText: 'The two passwords that you typed do not match. Please try again'
                    };
                    ModalSvc.showModal({}, passwordMatchErrorModalOptions)
                        .then(function(result) {});
                }
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
                        ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                            return;
                        });
                    });
            };
        }
    ]);
