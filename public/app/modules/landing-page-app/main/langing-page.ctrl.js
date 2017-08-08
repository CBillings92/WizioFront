/*
    Landing Page main controller - at www.wizio.co/
*/
angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$state',
        'ngDrift',
        function ($scope, $state, ngDrift) {
            $scope.goToDashboard = function () {
                $state.go('Account.Dashboard');
            };

            $scope.goToPricing = function (){
                $state.go('Pricing');
            };
        }
    ])
