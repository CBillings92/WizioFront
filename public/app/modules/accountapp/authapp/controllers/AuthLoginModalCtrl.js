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
        'ModalSvc',
        'AuthFct',
        'AuthResetPasswordResource',
        'AuthUpdatePasswordResource',
        'TokenSvc',
        'RerouteGetSetSvc',
        'WizioConfig',
        function($rootScope, $scope, $state, $localStorage, $stateParams, $facebook, $location, $modalInstance, ModalSvc, AuthFct, AuthResetPasswordResource, AuthUpdatePasswordResource, TokenSvc, RerouteGetSetSvc, WizioConfig) {
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
                $modalInstance.close();
            };

            $scope.forgotPassword = function() {
                $state.go('SendResetEmail');
                return $modalInstance.close('ok');
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
                        $scope.email = "";;
                        $scope.password = "";
                        // ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                        //     return;
                        // });
                    });
            };

        }
    ]);

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

        /*AuthResetPasswordResource.save(null, emailobj, function(data, status){
                alert('An email has been sent to '+emailobj.email+' with insturctions on how to reset your password');
                $state.go('Home');
        }, function(err){
            alert('Sorry, that email is not associated with a Wizio Account');
        });*/
