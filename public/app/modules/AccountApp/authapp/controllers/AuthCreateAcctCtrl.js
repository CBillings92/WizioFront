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
            $scope.setUserObj = function() {
                var user = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password,
                    accountType: "local",
                    userType: 1
                };
                UserRegistrationSvc.saveUser(user, function(data) {
                    var rerouteURL = RerouteGetSetSvc.get();
                    if(rerouteURL.length !== 0){
                        console.dir(rerouteURL);
                        return $location.path(rerouteURL);
                    }
                    return $state.go('Account.Dashboard.Main');
                });
            };
            $scope.createFacebookUser = function(){
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

            };

            $scope.cancel = function() {
                $state.go('Home');
            };

        }
    ]);
