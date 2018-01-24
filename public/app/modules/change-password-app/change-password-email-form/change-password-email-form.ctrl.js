angular.module("AccountApp").controller("ChangePasswordEmailFormCtrl", [
  "$scope",
  "ChangePasswordFct",
  "LoadingSpinnerFct",
  "ModalBuilderFct",
  function($scope, ChangePasswordFct, LoadingSpinnerFct, ModalBuilderFct) {
    $scope.forgotPassword = function() {
      LoadingSpinnerFct.show("send-reset-password-email");
      ChangePasswordFct.api.get
        .email($scope.passwordResetEmail)
        .then(function(apiResponse) {
          LoadingSpinnerFct.hide("send-reset-password-email");
          ModalBuilderFct.buildSimpleModal(
            "Close",
            "OK",
            "Sucess",
            "Password Reset Email Sent! Please check your email."
          ).then(function(result) {
            return;
          });
        })
        .catch(function(err) {});
    };
  }
]);
