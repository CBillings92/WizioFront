angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'VrPlayerFct',
    function($scope, VrPlayerFct) {
        /**
         * Used for navigating on Powered by Wizio Button
         * @return {null}
         */
        $scope.goToWizioSite = function() {
            window.open('https://www.wizio.co');
            return;
        }

    }
])
