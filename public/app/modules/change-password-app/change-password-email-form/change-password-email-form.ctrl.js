angular.module('AccountApp')
    .controller('ChangePasswordEmailFormCtrl', ['$scope', 'ChangePasswordFct', function($scope, ChangePasswordFct) {
        $scope.forgotPassword = function(){
            ChangePasswordFct.api.get.email($scope.passwordResetEmail)
            .then(function(apiResponse){

            })
            .catch(function(err){

            });
        }
    }])
