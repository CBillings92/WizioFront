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

            $scope.goToPricing = function (){
                $state.go('Pricing');
            };
            // console.dir('OMG HI THIS IS A TEST CODE CHANGE');
        }
    ])
