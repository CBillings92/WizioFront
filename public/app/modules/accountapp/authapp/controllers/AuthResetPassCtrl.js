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
            /*    $scope.facebookLogin = function(){
                    if($rootScope.authObjects.facebookConnected){
                        alert('Already logged in with email!');
                        if(RerouteGetSetSvc.get().length !== 0){
                            return $location.path(RerouteGetSetSvc.get());
                        }
                        return $state.go('Account.Dashboard.Main');
                    }
                    $facebook.login().then(function(data){
                        if(data.status === "connected"){
                            $facebook.api('/me').then(function(userdata){
                                var fbData = {
                                    user: userdata,
                                    facebook: true
                                };
                                AuthFct.signup(fbData, function(data, status){
                                    //do stuff with data?
                                    if(status === 403){
                                        $rootScope.isLoggedIn = false;
                                        return;
                                    }
                                    $rootScope.isLoggedIn = true;
                                    return;
                                });
                            });
                        } else {
                            alert("Can't autehtnicate Facebook credentials");
                        }
                    });


                };*/
            $scope.sendResetEmail = function() {
                var emailobj = {};
                emailobj.email = $scope.email;
                AuthResetPasswordResource.save(emailobj, function(responseObj) {
                    if (responseObj.status === "ERR") {
                        var resetPasswordNotSentModalOptions = {
                            closeButtonText: "Close",
                            actionButtonText: "OK",
                            headerText: "Password Reset Error",
                            bodyText: 'We could not send an email to ' + emailobj.email + ' for some reason. Please try another email.'
                        };
                        ModalSvc.showModal({}, resetPasswordNotSentModalOptions)
                            .then(function(result) {})
                    } else {
                        var resetPasswordSentModalOptions = {
                            closeButtonText: "Close",
                            actionButtonText: "OK",
                            headerText: "Password Reset",
                            bodyText: 'An email has been sent to ' + emailobj.email + ' with instructions on how to reset your password'
                        };
                        ModalSvc.showModal({}, resetPasswordSentModalOptions)
                            .then(function(result) {
                                $state.go('LandingPage');
                            })

                        // ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                        //     return;
                        // });
                    }
                    return;
                });
                /*AuthResetPasswordResource.save(null, emailobj, function(data, status){
                        alert('An email has been sent to '+emailobj.email+' with insturctions on how to reset your password');
                        $state.go('Home');
                }, function(err){
                    alert('Sorry, that email is not associated with a Wizio Account');
                });*/
            };
            $scope.closeModal = function() {
                $modalInstance.close();
            };

            var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');
            $scope.resetPassword = function() {
                if ($scope.password === $scope.passwordConfirm) {
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
                                })
                        } else {
                            var passwordUdateErrorModalOptions = {
                                closeButtonText: "Close",
                                actionButtonText: "OK",
                                headerText: "Password Update Error",
                                bodyText: 'We coult not update your password for some reason. Please try again.'
                            };
                            ModalSvc.showModal({}, passwordUdateErrorModalOptions)
                                .then(function(result) {})
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
                        .then(function(result) {})
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
                        return $modalInstance.close('ok');

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
