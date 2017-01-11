angular.module('AccountApp').controller('ChangePasswordCtrl', [
    '$scope',
    'ChangePasswordFct',
    function($scope, ChangePasswordFct) {
        $scope.changePassword = function() {
            ChangePasswordFct.api.update.password()
            .then(function(response){

            })
            .catch(function(error){
                
            })

        }
    }
])
