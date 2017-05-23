angular.module('VrPlayerApp').controller('VrPlayerCtrl', [
    '$scope',
    'VrPlayerFct',
    function($scope, VrPlayerFct) {
        alert('please');
        var viewer = new Marzipano.Viewer(document.querySelector('#pano'), {});
        // Create Source, Geometry and View
        var source = Marzipano.ImageUrlSource.fromString("../public/internallibraries/testphoto.jpg");
        var geometry = new Marzipano.EquirectGeometry([
            {
                width: 4000
            }
        ]);
        console.dir(Marzipano);
        var limiter = Marzipano.RectilinearView.limit.traditional(1920, 180 * Math.PI / 180);
        var view = new Marzipano.RectilinearView(null, limiter);

        // Create and display Scene
        var scene = viewer.createScene({source: source, geometry: geometry, view: view, pinFirstLevel: true});

        scene.switchTo();

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
