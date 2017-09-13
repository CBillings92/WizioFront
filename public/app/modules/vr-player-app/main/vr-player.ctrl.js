angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'ngDrift',
    'LoadingSpinnerFct',
    function($scope, ngDrift, LoadingSpinnerFct) {
        $scope.$on('TourDataReceived', function(event, data){
            wizio.init('pano', data, {}, function(response){
              LoadingSpinnerFct.hide('vrPlayerLoader');
            });
        })
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
