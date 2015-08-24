angular.module('LoginApp')
.controller('LoginCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$localStorage',
    'Auth',
    function($rootScope, $scope, $state, $localStorage, Auth){
        function successAuth(res){
            console.dir("in success auth!");
            $localStorage.token = res;
            $rootScope.isLoggedIn = true;
            $state.go('Home');
        }
        $scope.requestLogin = function(){
            var userData = {
                email: $scope.email,
                password: $scope.password
            };
            Auth.signin(userData, successAuth, function(){
                $rootScope.error = "Failed to sign in!";
                $state.go('Home');
            });
        };
    }
]);
