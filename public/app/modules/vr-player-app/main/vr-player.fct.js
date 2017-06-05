angular.module('VrPlayerApp')
    .factory('VrPlayerFct', [
        'WizioConfig',
        '$resource',
        function(WizioConfig, $resource) {

            function initPlayer(marzipanoViewer, imageSourceURL, configOgts) {
                var viewer = marzipanoViewer || new Marzipano.Viewer(document.querySelector('#pano'), {});
                // Create Source, Geometry and View
                var source = Marzipano.ImageUrlSource.fromString(imageSourceURL);
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

                return;
            }

            function switchScene(marzipanoViewer, imageSourceURL, configOpts) {
                var viewer = marzipanoViewer || new Marzipano.Viewer(document.querySelector('#pano'), {});
                var source = Marzipano.ImageUrlSource.fromString(imageSourceURL);
                var geometry = new Marzipano.EquirectGeometry([
                    {
                        width:4000
                    }
                ])
                var limiter = Marzipano.RectilinearView.limit.traditional(1920, 180 * Math.PI / 180);
                var view = new Marzipano.RectilinearView(null, limiter);

                var scene = viewer.createScene({source: source, geometry: geometry, view: view, pinFirstLevel: true});

                scene.switchTo();

                return
            }

            function maxFloorPlanHeight() {

            }

            return {
                calculate: {
                    maxFloorPlanHeight: maxFloorPlanHeight
                },
                initPlayer: initPlayer,
                switchScene: switchScene
            }
    }])
