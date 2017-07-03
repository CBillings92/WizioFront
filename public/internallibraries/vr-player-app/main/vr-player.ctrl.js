angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'VrPlayerFct',
    function($scope, VrPlayerFct) {
        // var viewer = new Marzipano.Viewer(document.querySelector('#pano'), {});
        // VrPlayerFct.initPlayer(viewer);

        // setTimeout(function(){VrPlayerFct.switchScene(viewer, 'https://cdn.wizio.co/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Entry.JPG', {})}, 5000);
        /**
         * Calculate the maximum floorplan image height
         * @type {int}
         */
        var maxFloorPlanHeight = VrPlayerFct.calculate.maxFloorPlanHeight();

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
