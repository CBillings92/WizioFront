angular.module('AccountApp')
.controller('AccountInfoCtrl', [
    '$scope',
    function($scope){
        $scope.$on('AccountInfoBroadcast', function(event, data){
            console.dir("IN $SCOPE.ON");
            console.dir(data);
            $scope.accountInfo = data;
        });

    }
]);
