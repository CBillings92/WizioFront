angular.module('AccountApp')
    .controller('ChangePasswordEmailFormCtrl', ['$scope', 'ChangePasswordFct', 'LoadingSpinnerFct', function($scope, ChangePasswordFct, LoadingSpinnerFct) {
        $scope.forgotPassword = function(){
            LoadingSpinnerFct.show('send-reset-password-email');
            ChangePasswordFct.api.get.email($scope.passwordResetEmail)
            .then(function(apiResponse){
                LoadingSpinnerFct.hide('send-reset-password-email');
                alert('Password Reset Email Sent');

            })
            .catch(function(err){

            });
        }
    }])
