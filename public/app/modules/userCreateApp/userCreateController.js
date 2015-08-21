angular.module('UserCreateApp')
.controller('UserCreateCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  '$sessionStorage',
  'createacct',
  'accountgetset',
  function($scope, $rootScope, $state, $sessionStorage, createacct, accountgetset) {
    scope.radioModel = {
      broker: false,
      tenant: true
    };
    scope.createAcct = function() {
      passwordConfirm = $scope.confirmPassword;
      var newAcct = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email,
        userName: $scope.userName,
        password: $scope.password
      };
      newAcct.userType = $scope.radioModel;
        if(newAcct.password === $scope.passwordConfirm) {
          createAcct.save(null, newAcct, function(data,status){
            console.dir(data);
            if(data.userType === "tenant") {
              $state.go('MyAccount');
            } else {
              accountgetset.setAccount(data);
              $sessionStorage.neededInfo = data.id;
            }
          });
        } else {
          $scope.password = '';
          $scope.passwordConfirm = '';
          alert("Passwords do not match");
        }
    };
  }
]);
