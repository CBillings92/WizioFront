angular.module('AccountApp')
    .controller('AuthCreateAcctCtrl', [
        '$scope',
        '$state',
        '$facebook',
        'UserRegistrationSvc',
        function($scope, $state, $facebook, UserRegistrationSvc) {

            //Set a standard, local user object to save for local authentication
            $scope.setUserObject = function() {
                var user = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password,
                    accountType: "local"
                };
                UserRegistrationSvc.saveUser(user, function(data) {
                    $state.go('Account.Dashboard.Main');
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
                                        $state.go('Account.Dashboard.Main');
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
