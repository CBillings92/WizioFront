angular.module('AccountApp')
    .controller('ChangePasswordFormCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        '$resource',
        'AuthFct',
        'TokenSvc',
        'ModalBuilderFct',
        'WizioConfig',
        function($scope, $state, $stateParams, $resource, AuthFct, TokenSvc, ModalBuilderFct, WizioConfig) {
        //FOR RESETING EMAIL - Goes with resetPassword.html
              // var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');
              $scope.resetPassword = function() {
                  var passwordsMatch = false;
                  //check to make sure the password matches

                  if($scope.passwordObj.password === $scope.passwordObj.passwordConfirm) {
                      passwordsMatch = true;
                  }

                  if (passwordsMatch) {
                      var passwordobj = {
                          password: $scope.passwordObj.password,
                          token: $stateParams.token
                      };
                      $resource(WizioConfig.baseAPIURL + "user/updatepassword").save(passwordobj, function(responseObj) {
                          if (responseObj.status !== "ERR") {
                              ModalBuilderFct.buildSimpleModal(
                                  'Close',
                                  'OK',
                                  'Password Updated',
                                  'You have successful updated the password for your account!'
                              ).then(function(result) {
                                  return $state.go('LandingPage');
                              });
                          } else {
                              ModalBuilderFct.buildSimpleModal(
                                  'Close',
                                  'OK',
                                  'Password Update Error',
                                  'We could not update your password at this time. Please try again later'
                              ).then(function(result) {
                                  return;
                              });
                          }
                          return;
                      });
                  } else {
                      $scope.password = '';
                      $scope.passwordConfirm = '';
                      ModalBuilderFct.buildSimpleModal(
                          'Close',
                          'OK',
                          'Passwords do not match',
                          'The two passwords you have provided do not match. Please try again'
                      ).then(function(result) {
                          return;
                      });
                  }
              };
    }])
