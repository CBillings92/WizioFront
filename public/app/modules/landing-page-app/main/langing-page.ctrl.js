/*
    Landing Page main controller - at www.wizio.co/
*/
angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$state',
        function ($scope, $state) {
            $scope.goToDashboard = function () {
                $state.go('Account.Dashboard');
            };

            $scope.goToProduct = function (){
                $state.go('Product');
            };
        }
    ])
