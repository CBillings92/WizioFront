angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'ngDrift',
    'LoadingSpinnerFct',
    function($scope, ngDrift, LoadingSpinnerFct) {
        $scope.$on('TourDataReceived', function(event, data){
            wizio.init('pano', data.progressivePhotoUrls, function(response){
              LoadingSpinnerFct.show('vrPlayerLoader');
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
