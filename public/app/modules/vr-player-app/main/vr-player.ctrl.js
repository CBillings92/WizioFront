angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'ngDrift',
    function($scope, ngDrift) {
        $scope.$on('TourDataReceived', function(event, data){
            // data.firstPhotoUrl = 'https://d1mze0h82dkhhe.cloudfront.net/180x90/test_5d3856bc-0b74-4922-a565-84da3d54398f/Photo%201.JPG'
            console.dir(data);
            wizio.init('pano', data.progressivePhotoUrls);
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
