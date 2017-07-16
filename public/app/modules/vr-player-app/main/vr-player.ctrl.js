angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'VrPlayerFct',
    function($scope, VrPlayerFct) {

        $scope.$on('TourDataReceived', function(event, data){
            wizio.init('pano', data.firstPhotoUrl);
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
