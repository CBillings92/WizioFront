angular.module('AccountApp')
    .controller('AuthCreateAcctCtrl', [
        '$scope',
        '$state',
        '$facebook',
        '$location',
        'UserRegistrationSvc',
        'RerouteGetSetSvc',
        function($scope, $state, $facebook, $location, UserRegistrationSvc, RerouteGetSetSvc) {

            //Set a standard, local user object to save for local authentication
            $scope.user = {};
            $scope.setUserObj = function() {
                if($scope.user.password === $scope.user.passwordConfirm){
                    $scope.user.accountType = 'local';
                    $scope.user.userType = 1;
                    UserRegistrationSvc.saveUser($scope.user, function(data) {
                        var rerouteURL = RerouteGetSetSvc.get();
                        if(rerouteURL.length !== 0){
                            return $location.path(rerouteURL);
                        }
                        return $state.go('Account.Dashboard.Main');
                    });
                } else {
                    alert("Passwords don't match!");
                }

            };
            /*$scope.createFacebookUser = function(){
                    $facebook.login().then(function(data){
                        switch(data.status){
                            case "connected":
                                $facebook.api('/me').then(function(user){
                                    console.dir(user);
                                    user.accountType = "facebook";
                                    UserRegistrationSvc.saveUser(user, function(data){
                                        var rerouteURL = RerouteGetSetSvc.get();
                                        if(rerouteURL.length !== 0){
                                            return $location.path(rerouteURL);
                                        }
                                        return $state.go('Account.Dashboard.Main');
                                    });
                                });
                                break;
                            case "not_authorized":
                                alert('Facebook error');
                                break;
                        }
                    });

            };*/

            $scope.cancel = function() {
                $state.go('Home');
            };

        }
    ]);
