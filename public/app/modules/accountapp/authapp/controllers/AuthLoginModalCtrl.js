angular.module('AccountApp')
    .controller('AuthLoginModalCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$localStorage',
        '$stateParams',
        '$facebook',
        '$location',
        '$modalInstance',
        'AuthFct',
        'AuthResetPasswordResource',
        'AuthUpdatePasswordResource',
        'TokenSvc',
        'RerouteGetSetSvc',
        function($rootScope, $scope, $state, $localStorage, $stateParams, $facebook, $location, $modalInstance, AuthFct, AuthResetPasswordResource, AuthUpdatePasswordResource, TokenSvc, RerouteGetSetSvc) {
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
                        alert("A password reset email could not be sent to this email. Please make sure you're using the right email");

                    } else {
                        alert('An email has been sent to ' + emailobj.email + ' with instructions on how to reset your password');
                    }

                    $state.go('Login');
                });
                /*AuthResetPasswordResource.save(null, emailobj, function(data, status){
                        alert('An email has been sent to '+emailobj.email+' with insturctions on how to reset your password');
                        $state.go('Home');
                }, function(err){
                    alert('Sorry, that email is not associated with a Wizio Account');
                });*/
            };
            $scope.resetPassword = function() {
                if ($scope.password === $scope.passwordConfirm) {
                    var passwordobj = {};
                    passwordobj.password = $scope.password;
                    passwordobj.token = $stateParams.token;
                    AuthUpdatePasswordResource.save(passwordobj, function(responseObj) {
                        if (responseObj.status !== "ERR") {
                            alert('Password updated for your account!');
                        } else {
                            alert("Password cannot be updated at this time");
                        }

                        $state.go('Login');
                    });
                } else {
                    $scope.password = '';
                    $scope.passwordConfirm = '';
                    alert("Passwords do not match");
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
                        var rerouteURL = RerouteGetSetSvc.get();
                        if (rerouteURL.length !== 0) {
                            return $location.path(rerouteURL);
                        }
                        return $modalInstance.close('ok');

                    },
                    function() {
                        $rootScope.error = "Failed to sign in!";
                        $state.go('Login');
                    });
            };

        }
    ]);
