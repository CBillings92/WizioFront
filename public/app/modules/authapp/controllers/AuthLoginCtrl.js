angular.module('AuthApp')
.controller('AuthLoginCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$localStorage',
    '$stateParams',
    'AuthFct',
    'AuthResetPasswordResource',
    'AuthUpdatePasswordResource',
    function($rootScope, $scope, $state, $localStorage, $stateParams, AuthFct, AuthResetPasswordResource, AuthUpdatePasswordResource){
        function successAuth(res){
            console.dir(res);
            console.dir("in success auth!");
            $localStorage.token = res.data;
            $rootScope.isLoggedIn = true;
            $state.go('UserAccount.Dashboard');
        }
        $scope.sendResetEmail = function(){
            var emailobj = {};
            emailobj.email = $scope.email;
            AuthResetPasswordResource.save(null, emailobj, function(data, status){
                    alert('An email has been sent to '+emailobj.email+' with insturctions on how to reset your password');
                    $state.go('Home');
            }, function(err){
                alert('Sorry, that email is not associated with a Wizio Account');
            });
        };
        $scope.resetPassword = function() {
            if($scope.password === $scope.passwordConfirm){
                var passwordobj = {};
                passwordobj.password = $scope.password;
                passwordobj.token = $stateParams.token;
                console.log('------------------');
                console.dir(passwordobj);
                AuthUpdatePasswordResource.save(passwordobj, function(data, status){
                  alert('Your password has been reset!');
                  $state.go('login');
                }, function(err){
                  alert('This link to reset your password has expired. Please select forgot password and try again');
                  $state.go('login');
                });
            } else {
              $scope.password = '';
              $scope.passwordConfirm = '';
              alert("Passwords do not match");
            }
        };
        $scope.requestLogin = function(){
            var userData = {
                email: $scope.email,
                password: $scope.password
            };
            AuthFct.signin(userData, successAuth, function(){
                $rootScope.error = "Failed to sign in!";
                $state.go('Home');
            });
        };

    }
]);
