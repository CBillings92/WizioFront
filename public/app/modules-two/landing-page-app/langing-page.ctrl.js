angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$state',
        function ($scope, $state) {
            alert('what');
            function goToDashboard () {
                $state.go('Account.Dashboard');
            };

            function goToPricing () {
                $state.go('Pricing');
            };

            $scope.actions = {
                go: {
                    toState: {
                        dashboard: goToDashboard,
                        pricing: goToPricing
                    }
                },
            }
        }
    ])
